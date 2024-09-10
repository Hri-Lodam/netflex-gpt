import { useRef, useState } from "react"
import Header from "./Header"
import { checkValidateData } from "../utils/validate"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";


const Login = () => {
  const [isSignInForm,setIsSignInForm] = useState(true)
  const [errorMessage,setErrorMessage] = useState()
  const dispatch = useDispatch();

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const handleClick = () => {
    const message = checkValidateData(email.current.value,password.current.value);
    setErrorMessage(message);
    if(message) return;

    if (!isSignInForm) {
      // SignUp Logic
      createUserWithEmailAndPassword(auth,email.current.value,password.current.value)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name.current.value, 
          photoURL: "https://cdn-icons-png.flaticon.com/512/2202/2202112.png"
        }).then(() => {
          const {uid,email,displayName,photoURL} = auth.currentUser;
          dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}));
        }).catch((error) => {
          setErrorMessage(error.message)
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + "-" + errorMessage);
      });
    } else {
      // Sign In Logic
      signInWithEmailAndPassword(auth,email.current.value,password.current.value)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + "-" + errorMessage)
      });
    }
  }

  const toggleSignInForm = () => {
      setIsSignInForm(!isSignInForm);
  }

  return (
    <div>
        <Header/>
        <div className="w-full absolute">
            <img src="https://user-images.githubusercontent.com/16425113/129554147-6ac7ba51-43e7-4c8e-ba77-e646a3ef6b12.jpg" alt="background"/>
        </div>
        <form onSubmit={(e)=>e.preventDefault()} className="bg-black absolute mt-60 mx-auto left-0 right-0 w-3/12 px-4 text-white rounded-lg opacity-90 py-8">
            <h1 className="font-bold text-3xl mb-2">{isSignInForm ? "Sign In" : "Sign Up"}</h1>
            {!isSignInForm &&
                <input ref={name} type="text" placeholder="Full Name" className="p-3 my-4 w-full bg-gray-700"/>
            }
            <input autoComplete="email" ref={email} type="text" placeholder="Email" className="p-3 my-4 w-full bg-gray-700"/>
            <input autoComplete="current-password" ref={password} type="password" placeholder="Password" className="p-3 my-4 w-full bg-gray-700"/>
            <p className="text-red-700 font-bold text-xl py-3">{errorMessage}</p>
            <button onClick={handleClick} className="p-3 text-xl my-6 w-full bg-red-600 rounded-lg font-bold">{isSignInForm ? "Sign In" : "Sign Up"}</button>
            <p className="text-lg cursor-pointer" onClick={toggleSignInForm}>
                {isSignInForm ? "New user? Sign up" : "Already Register user? Sign In"}
            </p>
        </form>
    </div>
  )
}

export default Login