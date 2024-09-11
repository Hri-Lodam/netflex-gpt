import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser,removeUser } from "../utils/userSlice";
import { LOGO_URL, PROFILE_AVTAR } from "../utils/constants";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store)=>store.user)

  useEffect(()=>{
      const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            const {uid,email,displayName,photoURL} = user;
            dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}));
            navigate("/browse");
          } else {
            dispatch(removeUser());
            navigate('/');
          }
        })

      return () => unsubscribe();
  },[])

  const handleSignOut = () => {
    signOut(auth)
    .then(() => {})
    .catch((error) => {
      navigate('/error');
    });
  }

  return (
    <div className="px-8 py-4 bg-gradient-to-b from-black absolute w-full z-10 flex justify-between align-middle">
        <img src={LOGO_URL} alt="Logo" className="w-40"/>
        {user && <div className="flex gap-3">
          <img className="w-12 h-auto" src={user?.photoURL || PROFILE_AVTAR} alt="profile"/>
          <button className="font-bold text-white" onClick={handleSignOut}>(Sign Out)</button>
        </div>}
    </div>
  )
}

export default Header