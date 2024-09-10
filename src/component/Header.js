import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const navigate = useNavigate();
  const user = useSelector((store)=>store.user)

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate('/');
    }).catch((error) => {
      navigate('/error');
    });
  }

  return (
    <div className="px-8 py-4 bg-gradient-to-b from-black absolute w-full z-10 flex justify-between align-middle">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Logonetflix.png/800px-Logonetflix.png" alt="Logo" className="w-40"/>
        {user && <div className="flex gap-3">
          <img className="w-12 h-auto" src={user?.photoURL || "https://cdn-icons-png.flaticon.com/512/2202/2202112.png"} alt="profile"/>
          <button className="font-bold text-white" onClick={handleSignOut}>(Sign Out)</button>
        </div>}
    </div>
  )
}

export default Header