import { app } from "../../utils/firebase";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../../redux/user/userSlice";
import * as authService from "../../services/authServices";

const Oauth = () => {
  const dispatch = useDispatch();

  const handleOAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const formData = {
        email: result.user.email,
        name: result.user.displayName,
        photo: result.user.photoURL,
      };
      const res = await authService.OAuth(formData)
      dispatch(signInSuccess(res));
    } catch (error) {
      console.log("could not login with google", error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleOAuth}
      className="mt-4 w-full rounded-lg bg-red-900 p-4 px-8 uppercase text-white hover:bg-red-600 disabled:opacity-70 md:text-[20px]"
    >
      CONTINUE WITH GOOGLE
    </button>
  );
};

export default Oauth;
