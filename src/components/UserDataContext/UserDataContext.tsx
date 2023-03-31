import { createContext, ReactNode, FC } from "react";
import { useState, useEffect } from "react";
import { db, auth } from "../../Api/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { UserDataType } from "./UserDataType";

interface UserDataProviderType {
  children: ReactNode;
}

const defaultState = {
  userData: {
    description: "",
    email: "",
    id: "",
    name: "",
    status: undefined,
    surname: "",
  },
};

export const userDataContext = createContext<UserDataType>(defaultState);

export const UserDataProvider: FC<UserDataProviderType> = ({ children }) => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);

        onSnapshot(userRef, (userSnapshot) => {
          const data = userSnapshot.data();

          if (!data) {
            return;
          }

          setUserData({ id: userSnapshot.id, ...data });
        });
      }
    });
  }, []);
  return (
    <userDataContext.Provider value={{ userData }}>
      {children}
    </userDataContext.Provider>
  );
};
