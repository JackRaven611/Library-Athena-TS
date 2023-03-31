import { useEffect, useState } from "react";
import { db } from "../../../Api/firebase";
import { collection, getDocs } from "firebase/firestore";
import BookCard from "./BookCard/BookCard";
import styles from "./ListBooks.module.css";
import ReactPaginate from "react-paginate";

const ListBooks = ({ selectedGenre, currentPage, onPageChange }) => {
  const [books, setBooks] = useState([]);

  const pageSize = 9;
  const [totalPages, setTotalPages] = useState(1);

  const getBooks = () => {
    const booksCollection = collection(db, "books");
    getDocs(booksCollection).then((querySnapshot) => {
      const allBooks = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const filteredBooks = allBooks.filter((book) => {
        if (selectedGenre.id === "allGenres") {
          return true;
        }
        if (book.genre) {
          return book.genre.toLowerCase() === selectedGenre.name.toLowerCase();
        } else {
          return false;
        }
      });
      const startIndex = currentPage * pageSize;
      const booksOnPage = filteredBooks.slice(
        startIndex,
        startIndex + pageSize
      );
      setBooks(booksOnPage);
      setTotalPages(Math.ceil(filteredBooks.length / pageSize));
    });
  };

  useEffect(() => {
    getBooks();
  }, [currentPage, selectedGenre]);

  return (
    <div className={styles.listBookWrapper}>
      <div className={styles.cards}>
        {books.map((book) => {
          return <BookCard key={book.id} book={book} />;
        })}
      </div>

      <div id="react-paginate" className={styles.reactPaginate}>
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakClassName={"break-me"}
          pageCount={totalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={10}
          onPageChange={onPageChange}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
          forcePage={currentPage}
        />
      </div>
    </div>
  );
};

export default ListBooks;
