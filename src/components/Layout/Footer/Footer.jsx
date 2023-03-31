import styles from "./Footer.module.css";
import illustration_books_footer from "./illustration_books_footer.png";

const Footer = () => {
  return (
    <div className={styles.footerWrapper}>
      <div className={styles.footerLogo}>
        <img
          className={styles.imgLogo}
          src={illustration_books_footer}
          alt="books"
        ></img>
        <p className={styles.pFooter}>Biblioteka Atena</p>
      </div>
      <div className={styles.footerAuthors}>
        <ul className={styles.footerAuthorsList}>
          Autorzy:
          <li className={styles.footerAuthor}>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/EwelinaBialoszycka"
            >
              Ewelina Białoszycka
            </a>
          </li>
          <li className={styles.footerAuthor}>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/witoldnaw"
            >
              Witold Nawrot
            </a>
          </li>
          <li className={styles.footerAuthor}>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/JackRaven611"
            >
              Jakub Bedynek{" "}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
