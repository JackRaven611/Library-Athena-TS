import { useContext, useEffect, useState, FC } from "react";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../../UserDataContext/UserDataContext";
import { db } from "../../../Api/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface AddBookToUserButtonType {
  bookId: string;
  bookStatus: string;
  buttonStyle: any;
}

export const AddBookToUserButton: FC<AddBookToUserButtonType> = ({
  bookId,
  bookStatus,
  buttonStyle,
}) => {
  const { userData } = useContext(userDataContext);
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();
  const notify = () => toast.success("Dodano do Twojej Półki");

  useEffect(() => {
    setIsDisabled(bookStatus === "niedostępna" ? true : false);
  }, [bookStatus]);

  const assignUserBook = async () => {
    const docRef = doc(db, "books", bookId);
    await updateDoc(docRef, {
      userId: `${userData.id}`,
      status: "niedostępna",
    });
  };

  const handleClick = () => {
    userData.status ? addBook() : navigate("/auth/login");
  };

  const addBook = () => {
    assignUserBook();
    notify();
    setIsDisabled(true);
  };

  return (
    <>
      <button
        disabled={isDisabled}
        className={buttonStyle}
        onClick={handleClick}
      >
        {isDisabled === false
          ? "Wypożycz książkę"
          : "Książka chwilowo niedostępna"}
      </button>
    </>
  );
};
