import { Link } from "react-router-dom";
import styles from "./HeroContent.module.css";
import illustration from "./illustration_hero_header1.png";

const HeroContent = () => {
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.illustrationWrapper}>
        <img
          className={styles.illustration}
          src={illustration}
          alt="illustration"
        ></img>
      </div>
      <div className={styles.description}>
        <p>
          "Kto czyta książki <br></br> żyje podwójnie"
        </p>
        <Link to="searching">
          <button className={styles.btn}>Wyszukaj książkę</button>
        </Link>
      </div>
    </div>
  );
};

export default HeroContent;
