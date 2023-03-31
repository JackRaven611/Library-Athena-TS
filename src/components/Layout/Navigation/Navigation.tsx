import { useContext } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../../Api/firebase";
import { signOut } from "firebase/auth";
import { userDataContext } from "../../UserDataContext/UserDataContext";
import styles from "./Navigation.module.css";
import logo from "./atena_logo1.png";
import avatar from "./atena_avatar1.png";

const signOutReload = () => {
  signOut(auth);
  window.location.reload();
  window.location.href = "http:/";
};

const Navigation = () => {
  const { userData } = useContext(userDataContext);
  return (
    <nav className={styles.navigation}>
      <Link to="/">
        <img className={styles.logoAtena} src={logo} alt="logo Atena"></img>
      </Link>
      <div className={styles.navigationDetails}>
        <div className={styles.btnWrapper}>
          {userData.status === undefined && (
            <>
              <Link to="auth/login">
                <button>Zaloguj się</button>
              </Link>
              <Link to="auth/register">
                <button>Zarejestruj się</button>
              </Link>
              <div className={styles.avatarWrapper}>
                <Link to="auth/login">
                  <img
                    className={styles.avatarAtena}
                    src={avatar}
                    alt="avatar Atena"
                  ></img>
                </Link>
              </div>
            </>
          )}
          {userData.status === "user" && (
            <>
              <Link to="/">
                <button onClick={signOutReload}>Wyloguj się</button>
              </Link>
              <div className={styles.avatarWrapper}>
                <Link to="auth/profile">
                  <img
                    className={styles.avatarAtena}
                    src={avatar}
                    alt="avatar Atena"
                  ></img>
                </Link>
              </div>
            </>
          )}
          {userData.status === "admin" && (
            <>
              <Link to="/">
                <button onClick={signOutReload}>Wyloguj się</button>
              </Link>
              <div className={styles.avatarWrapper}>
                <Link to="auth/admin">
                  <img
                    className={styles.avatarAtena}
                    src={avatar}
                    alt="avatar Atena"
                  ></img>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
