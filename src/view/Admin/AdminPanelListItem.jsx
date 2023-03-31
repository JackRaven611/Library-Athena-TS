import { useState } from "react";
import { db } from "../../../src/Api/firebase";
import { doc, updateDoc, getDoc, deleteDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { Modal } from "@mui/material";
import styles from "./Admin.module.css";

export const AdminPanelListItem = ({ book, getData }) => {
  const [title, setNewTitle] = useState(book.title);
  const [author, setNewAuthor] = useState(book.author);
  const [description, setNewDescription] = useState(book.description);
  const [status, setNewStatus] = useState(book.status);
  const [image, setNewImage] = useState();
  const [genre, setNewGenre] = useState(book.genre);
  const [userId, setUserId] = useState(book.userId);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const deleteUserId = (e) => {
    setNewStatus(e.target.value);
    setUserId("");
  };

  const handleDelete = () => {
    const docRef = doc(db, "books", book.id);

    deleteDoc(docRef)
      .then(() => {
        toast.success("Ksiązka usunięta!");
        getData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdate = () => {
    const docRef = doc(db, "books", book.id);

    getDoc(docRef).then((doc) => {
      if (doc.exists) {
        const updates = {
          title: title || doc.data().title,
          author: author || doc.data().author,
          description: description || doc.data().description,
          status: status || doc.data().status,
          image: image || doc.data().image,
          genre: genre || doc.data().genre,
          userId: userId,
        };
        updateDoc(docRef, updates, book.id)
          .then(() => {
            handleClose();
            toast.success("Dane zostały zmienione poprawnie");
            getData();
            deleteUserId();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };
  return (
    <>
      <div className={styles.listItemBox}>
        <li className={styles.listItemWrapper}>
          <img
            className={styles.bookCoverLI}
            src={book.image}
            alt="okładka ksiązki"
          ></img>
          <div className={styles.bookDescriptionLI}>
            <p className={styles.bookTitleLI}>{book.title}</p>
            <p className={styles.bookAuthorLI}>{book.author}</p>
            <p className={styles.bookStatusLI}>Status: {book.status} </p>
          </div>
          <div className={styles.ButtonsWrapperLI}>
            <button id={styles.buttonAppearanceLI} onClick={handleOpen}>
              Edytuj
            </button>
            <button id={styles.buttonAppearanceLI} onClick={handleDelete}>
              Usuń
            </button>
          </div>
        </li>
      </div>
      <Modal open={open} onClose={handleClose} contentLabel="Example Modal">
        <div className={styles.modalWrapper}>
          <div className={styles.modalContentWrapper}>
            <p className={styles.modalTitle}>Wprowadź zmiany:</p>
            <label className={styles.adminLabel} htmlFor="Tytuł">
              Tytuł:
            </label>
            <input
              className={styles.adminInput}
              type="text"
              name="title"
              value={title}
              onChange={(e) => setNewTitle(e.target.value)}
            />

            <label className={styles.adminLabel} htmlFor="author">
              Autor:
            </label>
            <input
              className={styles.adminInput}
              key={book.author}
              type="text"
              name="author"
              value={author}
              onChange={(e) => setNewAuthor(e.target.value)}
            />

            <label className={styles.adminLabel} htmlFor="description">
              Opis:
            </label>
            <input
              className={styles.adminInput}
              key={book.description}
              type="text"
              name="description"
              value={description}
              onChange={(e) => setNewDescription(e.target.value)}
            />
            <label className={styles.adminLabel} htmlFor="imageurl">
              Zdjęcie ksiązki:
            </label>
            <input
              className={styles.adminInput}
              key={book.imageURL}
              type="text"
              placeholder={book.imageURL}
              name="imageURL"
              value={image}
              onChange={(e) => setNewImage(e.target.value)}
            />
            <label className={styles.adminLabel} htmlFor="gatunek">
              Gatunek:
            </label>
            <select className={styles.adminSelect}>
              id="genre" name="genre" key={book.genre}
              value={genre}
              onChange={(e) => setNewGenre(e.target.value)}
              <option value="kryminał">Kryminał</option>
              <option value="lektura szkolna">Lektura szkolna</option>
              <option value="poradnik">Poradnik</option>
              <option value="książki dla dzieci">Książka dla dzieci</option>
              <option value="biografia">Biografia</option>
              <option value="literatura obyczajowa">
                Literatura obyczajowa
              </option>
              <option value="thriller">Thriller</option>
              <option value="literatura piękna">Literatura piękna</option>
            </select>

            <div className={styles.statusWrapper}>
              <input
                className={styles.status}
                type="radio"
                name="status"
                key={book.statuss}
                value="dostępna"
                checked={status === "dostępna"}
                onChange={deleteUserId}
              />
              <label htmlFor="status" className={styles.statusDetails}>
                Dostępna
              </label>
              <input
                className={styles.status}
                key={book.status}
                type="radio"
                name="status"
                value="niedostępna"
                checked={status === "niedostępna"}
                onChange={(e) => setNewStatus(e.target.value)}
              />
              <label htmlFor="status" className={styles.statusDetails}>
                Niedostępna
              </label>
            </div>

            <div className={styles.ButtonsWrapperModal}>
              <button
                className={styles.BtnModal}
                onClick={() => {
                  handleUpdate(book.id);
                }}
              >
                Zapisz zmiany
              </button>
              <button className={styles.BtnModal} onClick={handleClose}>
                Zamknij
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
