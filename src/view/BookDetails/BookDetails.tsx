import { useParams } from "react-router-dom";
import { useEffect, useState, FC } from "react";
import { db } from "../../Api/firebase.js";
import { doc, getDoc } from "firebase/firestore";
import styles from "./BookDetails.module.css";
import { AddBookToUserButton } from "../../components/UserBooks/AddBookToUserButton/AddBookToUserButton";
import { BookDetailsType } from "./BookDetailsType.js";

const defaultBook = {
  author: "",
  description: "",
  genre: "",
  image: "",
  status: "",
  title: "",
  userId: "",
  id: "",
};

export const BookDetails: FC<BookDetailsType> = () => {
  const params = useParams();
  const [book, setBook] = useState(defaultBook);

  function getBooksById(id: string) {
    const docRef = doc(db, "books", id);
    return getDoc(docRef)
      .then((querySnapshot) => {
        return {
          id: querySnapshot.id,
          ...querySnapshot.data(),
        };
      })
      .then((data) => {
        return data;
      });
  }

  useEffect(() => {
    params.bookId
      ? getBooksById(params.bookId)
          .then((data) => {
            //@ts-ignore
            setBook(data);
            console.log(data);
          })
          .catch((er) => console.log(er))
      : console.log({});
  }, [params.bookId]);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>{book.title}</h1>
      <div className={styles.infoWrapper}>
        <section className={styles.book_info}>
          <img src={book.image} alt="cover img" />{" "}
          <ul className={styles.info_list}>
            <li>
              <p>
                <strong>Tytuł: </strong>
                {book.title}
              </p>
            </li>
            <li>
              <p>
                <strong>Autor: </strong>
                {book.author}
              </p>
            </li>
            <li>
              <p>
                <strong>Gatunek: </strong>
                {book.genre}
              </p>
            </li>
            <li>
              <p>
                <strong>Status: </strong>
                {book.status}
              </p>
            </li>
          </ul>
        </section>
      </div>
      <section className={styles.book_description}>
        <p className={styles.book_description_name}>Opis:</p>
        <p>{book.description}</p>
      </section>
      <div className={styles.button_wrapper}>
        <AddBookToUserButton
          bookId={book.id}
          bookStatus={book.status}
          buttonStyle={styles.addButton}
        />
      </div>
    </div>
  );
};
