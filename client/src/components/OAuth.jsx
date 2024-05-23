import { Button } from "flowbite-react";
import google from "../assets/google.webp";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { SignInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      // console.log(result);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(SignInSuccess(data));
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Button
      onClick={handleGoogleClick}
      type="button"
      outline
      gradientDuoTone="cyanToBlue"
    >
      <img
        src={google}
        className="w-5 h-5 mr-2 object-cover rounded-full"
        alt="google icon"
      />
      <span>Continue with Google</span>
    </Button>
  );
};

export default OAuth;
