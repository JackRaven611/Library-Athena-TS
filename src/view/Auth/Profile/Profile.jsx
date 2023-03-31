import { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./Profile.module.css";
import avatar from "../../../assets/atena_avatar1.png";
import { userDataContext } from "../../../components/UserDataContext/UserDataContext";
import { UserBooksList } from "../../../components/UserBooks/UserBooksList/UserBooksList";

export const Profile = () => {
  const { userData } = useContext(userDataContext);
  return (
    <>
      <div className={styles.userWrapper}>
        <section className={styles.user_profile}>
          <img className={styles.user_picture} src={avatar} alt="user avatar" />
          <div>
            <ul className={styles.user_text}>
              <li>
                <h2>
                  {userData.name} {userData.surname}
                </h2>
              </li>
              <li>
                <p>{userData.description}</p>
              </li>
              <li className={styles.contact}>
                <p>{userData.email}</p>
              </li>
            </ul>
          </div>
        </section>
      </div>
      <h2 className={styles.user_shelf}>Twoja Półka:</h2>
      <section className={styles.user_books}>
        <UserBooksList />
      </section>
      <div className={styles.button_wrapper}>
        <Link to="/searching">
          <button className={styles.button}>Wypożycz kolejną książkę</button>
        </Link>
      </div>
    </>
  );
};
