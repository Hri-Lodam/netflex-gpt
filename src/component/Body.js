import { useState } from "react"
import Login from "./Login"

const Body = () => {
    const [isSignInForm,setIsSignInForm] = useState(true)

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    }

    return (
        <div>
            <Login/>
            <div>
                <img src="https://user-images.githubusercontent.com/16425113/129554147-6ac7ba51-43e7-4c8e-ba77-e646a3ef6b12.jpg" className="w-full absolute" />
            </div>
            <form className="bg-black absolute mt-60 mx-auto left-0 right-0 w-3/12 p-4 text-white rounded-lg opacity-90 py-8">
                <h1 className="font-bold text-3xl mb-2">{isSignInForm ? "Sign In" : "Sign Up"}</h1>
                {!isSignInForm &&
                    <input type="text" placeholder="Full Name" className="p-3 my-4 w-full bg-gray-700"/>
                }
                <input type="text" placeholder="Email" className="p-3 my-4 w-full bg-gray-700"/>
                <input type="password" placeholder="Password" className="p-3 my-4 w-full bg-gray-700"/>
                <button className="p-3 text-xl my-6 w-full bg-red-600 rounded-lg font-bold">{isSignInForm ? "Sign In" : "Sign Up"}</button>
                <p className="text-lg cursor-pointer" onClick={toggleSignInForm}>
                    {isSignInForm ? "New user? Sign up" : "Already Register user? Sign In"}
                </p>
            </form>
        </div>
    )
}

export default Body