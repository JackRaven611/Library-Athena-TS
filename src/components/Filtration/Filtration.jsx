import { useState, useEffect } from "react";
import Filter from "./Filter";
import styles from "./Filtration.module.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Api/firebase";

const Filtration = ({ onGenreChange }) => {
  const [genres, setGenres] = useState([]);

  const getGenres = () => {
    const genreCollection = collection(db, "genres");
    getDocs(genreCollection).then((querySnapshot) => {
      const allGenres = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setGenres(allGenres);
    });
  };

  useEffect(() => {
    getGenres();
  }, []);

  return (
    <div className={styles.filtrationWrapper}>
      <Filter
        onGenreChange={onGenreChange}
        key="allGenres"
        genre={{ id: "allGenres", name: "Wszystkie książki" }}
      />
      {genres.map((genreItem) => {
        return (
          <Filter
            onGenreChange={onGenreChange}
            key={genreItem.id}
            genre={genreItem}
          />
        );
      })}
    </div>
  );
};

export default Filtration;
