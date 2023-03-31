import { FC } from "react";
import styles from "./Filtration.module.css";

interface FilterType {
  genre: {
    id: string;
    name: string;
  };
  onGenreChange: (arg1: {}) => void;
}

const Filter: FC<FilterType> = ({ genre, onGenreChange }) => {
  return (
    <div className={styles.filter}>
      <label htmlFor={genre.name} className={styles.labelFilter}>
        <input
          className={styles.inputFilter}
          type="radio"
          id={genre.name}
          value={genre.name}
          name="category"
          onClick={() => onGenreChange(genre)}
        />
        <span className={styles.spanFilter}>
          <span className={styles.spanFilterText}>{genre.name}</span>
        </span>
      </label>
    </div>
  );
};

export default Filter;
