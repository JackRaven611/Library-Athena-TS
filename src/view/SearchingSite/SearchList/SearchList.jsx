import { useState } from "react";
import { db } from "../../../Api/firebase";
import { collection, getDocs } from "firebase/firestore";
import styles from "./SearchList.module.css";
import illustration from "./illustration_girlwithbook_searching.png";
import BookCard from "../../Home/ListBooks/BookCard/BookCard";

const SearchList = () => {
  const [books, setBooks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [lastSearchQuery, setLastSearchQuery] = useState("");
  const [searchState, setSearchState] = useState(false);

  const getBooks = (query) => {
    if (query.length === 0) {
      setLastSearchQuery(query);
      setSearchState(true);
      setBooks([]);
      return;
    }

    const booksCollection = collection(db, "books");
    getDocs(booksCollection).then((querySnapshot) => {
      const allBooks = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("wszystkie książki:", allBooks);
      const filteredBooks = allBooks.filter(
        (book) =>
          book.title.toLowerCase().includes(query.toLowerCase()) ||
          book.author.toLowerCase().includes(query.toLowerCase())
      );

      console.log(`przefiltrowane książki: ${filteredBooks}`);
      setLastSearchQuery(query);
      setBooks(filteredBooks);
      setSearchState(true);
    });
  };
  const performSearch = () => {
    getBooks(inputValue);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      performSearch();
    }
  };
  const updateInputValue = (event) => {
    setInputValue(event.target.value);
  };

  const queryResult = () => {
    if (searchState === false) {
      return (
        <p className={styles.listBooksFail}>
          Na pewno tutaj znajdziesz coś dla siebie! Wyszukaj książkę po tytule
          lub autorze.
        </p>
      );
    }
    if (lastSearchQuery.length === 0 && books.length === 0) {
      return <p className={styles.listBooksFail}>Spróbuj ponownie.</p>;
    }
    if (lastSearchQuery.length > 0 && books.length === 0) {
      return (
        <p className={styles.listBooksFail}>
          Nie mamy książki, której szukasz :(. <br />
          Spróbuj ponownie - może znajdziesz coś innego :)
        </p>
      );
    }
    return (
      <div className={styles.cards}>
        {books.map((book) => {
          return <BookCard key={book.id} book={book} />;
        })}{" "}
      </div>
    );
  };
  return (
    <div className={styles.SearchWrapper}>
      <div className={styles.SearchBanner}>
        <img
          className={styles.SearchIllustration}
          src={illustration}
          alt="illustration"
        ></img>
        <div className={styles.SearchBox}>
          <p className={styles.SearchDescription}>Co chcesz przeczytać?</p>
          <input
            onKeyDown={handleKeyDown}
            className={styles.SearchInput}
            onChange={updateInputValue}
            placeholder="Wyszukaj książkę"
          />
          <button className={styles.SearchButton} onClick={performSearch}>
            Szukaj
          </button>
        </div>
      </div>
      <div className={styles.listBookWrapper}>
        <span className={styles.ListBooks}>Wyniki wyszukiwania:</span>
        {queryResult()}
      </div>
    </div>
  );
};

export default SearchList;
