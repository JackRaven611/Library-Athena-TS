import { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./BookCard.module.css";
import { AddBookToUserButton } from "../../../../components/UserBooks/AddBookToUserButton/AddBookToUserButton";

interface BookCardType {
  book: {
    title: string;
    id: string;
    author: string;
    image: string;
    status: string;
  };
}

const BookCard: FC<BookCardType> = ({ book }) => {
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.card}>
        <div className={styles.cardOptions}>
          <Link to={`/${book.title}/${book.id}`}>
            <button className={styles.cardOption}>Szczegóły</button>
          </Link>
          <AddBookToUserButton
            buttonStyle={styles.cardOption}
            bookId={book.id}
            bookStatus={book.status}
          />
        </div>
        <div className={styles.cardMedia}>
          <img
            className={styles.bookCover}
            src={book.image}
            alt={`${book.title} cover`}
          />
        </div>
      </div>
      <Link to={`/${book.title}/${book.id}`}>
        <div className={styles.cardContent}>
          <p className={styles.title}> {book.title}</p>
          <p className={styles.author}> {book.author}</p>
        </div>
      </Link>
    </div>
  );
};

export default BookCard;
