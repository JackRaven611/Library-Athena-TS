import React, { useState } from "react";
import { db } from "../../Api/firebase";
import { collection, addDoc } from "firebase/firestore";
import styles from "./Admin.module.css";
import illustration from "./illustration_boywithbook_admin.png";
import { AdminPanelBooksList } from "./AdminPanelBooksList";

export const AddBooks = () => {
  const colRef = collection(db, "books");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [image, setImage] = useState("");
  const [genre, setGenre] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    addDoc(colRef, {
      title,
      author,
      description,
      status,
      userId: "",
      image,
      genre,
    })
      .then(() => {
        setTitle("");
        setAuthor("");
        setDescription("");
        setStatus("");
        setImage("");
        setGenre("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div className={styles.adminBox}>
        <div className={styles.adminWrapper}>
          <form className={styles.formAdminWrapper} onSubmit={handleSubmit}>
            <h2 className={styles.adminTitle}>Panel Administratora</h2>
            <label className={styles.adminLabel} htmlFor="title">
              Tytuł:
            </label>
            <input
              className={styles.adminInput}
              type="text"
              name="title"
              placeholder="Podaj tytuł ksiażki"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <label className={styles.adminLabel} htmlFor="author">
              Autor:
            </label>
            <input
              className={styles.adminInput}
              type="text"
              name="author"
              placeholder="Podaj autora ksiażki"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />

            <label className={styles.adminLabel} htmlFor="description">
              Opis:
            </label>
            <input
              className={styles.adminInput}
              type="text"
              name="description"
              placeholder="Opisz książkę"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <label className={styles.adminLabel} htmlFor="imageURL">
              Zdjęcie książki:
            </label>
            <input
              className={styles.adminInput}
              type="url"
              name="imageURL"
              placeholder="Umieść link do okładki książki"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />

            <label className={styles.adminLabel} htmlFor="genre">
              Gatunek:
            </label>
            <select
              id="genre"
              name="genre"
              onChange={(e) => setGenre(e.target.value)}
              required
              className={styles.adminSelect}
            >
              <option value="kryminał">Kryminał</option>
              <option value="lektura szkolna">Lektura szkolna</option>
              <option value="poradnik">Poradnik</option>
              <option value="ksiąka dla dzieci">Ksiąka dla dzieci</option>
              <option value="biografia">Biografia</option>
              <option value="literatura obyczajowa">
                Literatura obyczajowa
              </option>
              <option value="thriller">Thriller</option>
              <option value="literatura piękna">Literatura piękna</option>
            </select>

            <div className={styles.statusBox}>
              <div className={styles.statusWrapper}>
                <input
                  className={styles.status}
                  type="radio"
                  name="status"
                  value="dostępna"
                  checked={status === "dostępna"}
                  onChange={(e) => setStatus(e.target.value)}
                  required
                />
                <label className={styles.statusDetails} htmlFor="status">
                  Dostępna
                </label>
              </div>
              <div className={styles.statusWrapper}>
                <input
                  className={styles.status}
                  type="radio"
                  name="status"
                  value="niedostępna"
                  checked={status === "niedostępna"}
                  onChange={(e) => setStatus(e.target.value)}
                  required
                />
                <label className={styles.statusDetails} htmlFor="status">
                  Niedostępna
                </label>
              </div>
            </div>
            <div className={styles.buttonWrapper}>
              <button id={styles.buttonAppearance}>Dodaj książkę</button>
            </div>
          </form>
          <img
            className={styles.illustration}
            src={illustration}
            alt="illustration man with book"
          ></img>
        </div>
      </div>
      <AdminPanelBooksList />
    </>
  );
};
