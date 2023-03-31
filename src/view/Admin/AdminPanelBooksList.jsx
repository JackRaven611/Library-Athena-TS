import { useEffect, useState } from "react";
import { db } from "../../../src/Api/firebase";
import { collection, getDocs } from "firebase/firestore";
import styles from "./Admin.module.css";
import { AdminPanelListItem } from "./AdminPanelListItem";

export const AdminPanelBooksList = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const getData = () => {
    const itemsCollection = collection(db, "books");
    getDocs(itemsCollection).then((querySnapshot) => {
      const books = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBooks(books);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className={styles.adminPanelTitleWrapper}>
        <h2 className={styles.adminPanelTitle}>
          Zarządzaj książkami w bibliotece:
        </h2>
      </div>
      <input className={styles.adminSearchInput}
  type="text"
  placeholder="Wyszukaj tytuł lub autora książki"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>
{books.filter(book => book.title.toLowerCase().includes(searchTerm.toLowerCase()) || book.author.toLowerCase().includes(searchTerm.toLowerCase())).map(book => (
        <AdminPanelListItem book={book} getData={getData} />
      ))}
    </>
  );
};
