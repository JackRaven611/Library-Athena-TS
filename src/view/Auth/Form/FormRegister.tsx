import { FC } from "react";
import styles from "./Form.module.css";
import picture from "./illustration_atena_signup.png";
import { Link } from "react-router-dom";
import { Modal } from "@mui/material";
import { FormType } from "./FormType";

export const FormRegister: FC<FormType> = ({
  submitText,
  onSubmit,
  open,
  handleOpen,
}) => (
  <div className={styles.formWrapper}>
    <img className={styles.picture} src={picture} alt="books"></img>
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
        handleOpen();
      }}
    >
      <div className={styles.labelWrapper}>
        <label htmlFor="email">E-mail:</label>
        <input type="email" name="email" id="email" />
      </div>
      <div className={styles.labelWrapper}>
        <label htmlFor="name">Imię:</label>
        <input type="text" name="name" id="name" />
      </div>
      <div className={styles.labelWrapper}>
        <label htmlFor="surname">Nazwisko:</label>
        <input type="text" name="surname" id="surname" />
      </div>
      <div className={styles.labelWrapper}>
        <label htmlFor="password">Hasło:</label>
        <input type="password" name="password" id="password" />
      </div>
      <div className={styles.labelWrapper}>
        <label htmlFor="description">Napisz coś o sobie:</label>
        <input type="text" name="description" id="description" />
      </div>
      <div className={styles.btnWrapper}>
        <button className={styles.btnForm}>{submitText}</button>
      </div>
      <Modal open={open} onClose={handleOpen} contentLabel="Example Modal">
        <div className={styles.modalWrapperRegister}>
          <div className={styles.modalContentWrapper}>
            <h2 className={styles.modalTitle}>Gratulacje!</h2>
            <p className={styles.modalText}>
              Pomyślnie zarejestrowałeś się w naszej bibliotece.
            </p>
            <p className={styles.modalTextSmall}>
              Teraz możesz swobodnie wypożyczać książki z naszych półek. Jeśli
              potrzebujesz pomocy lub masz jakiekolwiek pytania, nie wahaj się
              skontaktować z naszym Bibliotekarzem.
            </p>
            <p className={styles.modalTextSmall}>Życzymy udanej lektury!</p>
            <Link to="/auth/login">
              <button className={styles.btnModal}>Zaloguj się!</button>
            </Link>
          </div>
        </div>
      </Modal>
    </form>
  </div>
);
