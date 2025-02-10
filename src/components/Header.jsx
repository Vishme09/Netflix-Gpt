import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, User_Avatar } from "../utils/constant";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        navigate("/error");
        // An error happened.
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
        // ...
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    //// Clean up the listener on unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className="absolute p-2 bg-gradient-to-br from-black w-full flex justify-between z-10">
      <img className="w-44 m-4" src={LOGO} alt="netflix-logo" />
      {user && (
        <div className="flex">
          <img className="w-24 p-3 " src={User_Avatar} alt="profile-icon" />
          <button onClick={handleSignout} className="text-white text-bold ">
            SignOut
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
