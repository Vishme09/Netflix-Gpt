import { useRef, useState } from "react";
import Header from "./Header";

import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase.js";
import { addUser } from "../utils/userSlice.js";
import { useDispatch } from "react-redux";
import { User_Avatar } from "../utils/constant.js";

//URL to see project
//https://netflixgpt-fd087.web.app/
// npm i -D @reduxjs/toolkit

const Login = () => {
  const [errorMessage, setErrorMessage] = useState();
  const [isSignInForm, setSignInForm] = useState(true);

  const dispatch = useDispatch();
  const handleSignInToggle = () => {
    setSignInForm(!isSignInForm);
  };

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    // console.log(email.current.value);
    // console.log(password.current.value);
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      //sign up logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: User_Avatar,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {});

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " - " + errorMessage);
        });
    } else {
      //Sign in logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " - " + errorMessage);
        });
    }
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/638e9299-0637-42d1-ba39-54ade4cf2bf6/web/IN-en-20250203-TRIFECTA-perspective_46eb8857-face-4ea6-b901-dbf22b461369_medium.jpg"
          alt="background-img"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-3/12 absolute  my-36 p-12 bg-black mx-auto right-0 left-0 text-white opacity-90 rounded-lg"
      >
        <h1 className="font-bold text-3xl py-4 ">
          {isSignInForm ? "Sign In " : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full name "
            className="p-4 my-2 w-full bg-gray-800 "
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email address"
          className="p-4 my-2 w-full bg-gray-800 "
        />
        <input
          ref={password}
          type="password"
          placeholder="Password "
          className="p-4 my-2 w-full bg-gray-800"
        />
        <p className="text-red-600 text-lg p-2">{errorMessage}</p>
        <button
          className="p-4 my-4 bg-red-700 w-full rounded-lg"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In " : "Sign Up"}
        </button>
        <p className="my-4 cursor-pointer" onClick={handleSignInToggle}>
          {isSignInForm
            ? "New to Netflix? Sign Up"
            : "Already registerd? Sign In"}
        </p>
      </form>
    </div>
  );
};

export default Login;
