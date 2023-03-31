import { createUserWithEmailAndPassword } from "@firebase/auth";
import { auth, db } from "../../../Api/firebase";
import { firebaseErrors } from "../../../utils/firebaseErrors";
import { getFormData } from "../../../utils/getFormData";
import { doc, setDoc } from "firebase/firestore";
import { FormRegister } from "../Form/FormRegister";
import { useState } from "react";

export const Register = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  const handleRegister = async (e) => {
    try {
      const { email, password, name, surname, description } = getFormData(e);
      const jwt = await createUserWithEmailAndPassword(auth, email, password);
      const userData = { status: "user", email, name, surname, description };
      const userRef = doc(db, "users", jwt.user.uid);
      e.preventDefault();
      await setDoc(userRef, {
        ...userData,
        id: jwt.user.uid,
      });
    } catch (error) {
      return firebaseErrors[error.code];
    }
  };
  return (
    <FormRegister
      submitText="Zarejestruj się"
      onSubmit={handleRegister}
      handleOpen={handleOpen}
      open={open}
    />
  );
};
