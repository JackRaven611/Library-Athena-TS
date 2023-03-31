import { useState, useEffect, useContext } from "react";
import {
  getDocs,
  query,
  collection,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../Api/firebase";
import { userDataContext } from "../../UserDataContext/UserDataContext";
import styles from "./UserBooksList.module.css";
import { Link } from "react-router-dom";

export const UserBooksList = () => {
  const [userBooks, setUserBooks] = useState([]);
  const { userData } = useContext(userDataContext);

  async function getBooksByUserId() {
    const q = query(
      collection(db, "books"),
      where("userId", "==", userData.id)
    );
    const querySnapshot = await getDocs(q);
    const books = querySnapshot.docs.map((book) => ({
      id: book.id,
      ...book.data(),
    }));
    setUserBooks(books);
  }

  useEffect(() => {
    getBooksByUserId();
  }, [userData.id]);

  return userBooks.map(({ id, title, author, description, image }) => {
    const unassignUserBook = async () => {
      const docRef = doc(db, "books", id);
      await updateDoc(docRef, {
        userId: "",
        status: "dostępna",
      });
      getBooksByUserId();
    };

    return (
      <div className={styles.userBooksWrapper}>
        <li key={id} className={styles.user_books}>
          <img key={id} src={image} alt="book cover" />
          <ul className={styles.user_books_details}>
            <li>
              <h3 className={styles.user_books_title} key={id}>
                {title}
              </h3>
            </li>
            <li>
              <h4 key={id}>{author}</h4>
            </li>
            <li>
              <p key={id}>{description.substring(0, 100)}...</p>
            </li>
          </ul>
          <div className={styles.button_wrapper}>
            <Link to={`/${title}/${id}`}>
              <button className={styles.button}>Zobacz Książkę</button>
            </Link>
            <button className={styles.button} onClick={unassignUserBook}>
              Oddaj Książkę
            </button>
          </div>
        </li>
      </div>
    );
  });
};
