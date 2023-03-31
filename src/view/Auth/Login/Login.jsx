import { signInWithEmailAndPassword } from "@firebase/auth";
import { FormLogin } from "../Form/FormLogin";
import { auth } from "../../../Api/firebase";
import { firebaseErrors } from "../../../utils/firebaseErrors";
import { getFormData } from "../../../utils/getFormData";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = getFormData(e);
    signInWithEmailAndPassword(auth, email, password)
      .then((jwt) => {
        e.target.reset();
        navigate("/");
      })
      .catch((e) => {
        console.dir(e);
        alert(firebaseErrors[e.code]);
      });
  };

  return (
    <>
      <FormLogin submitText="Zaloguj się" onSubmit={handleLogin} />
    </>
  );
};
