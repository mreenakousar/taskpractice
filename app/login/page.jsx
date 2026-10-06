"use client"
import loginAction from "../../actions/loginForm"
export default function loginUP(){
    return(
        <div className="flex items-center justify-center mt-6">
        <form className="flex flex-col gap-3 w-80 p-6 border rounded-lg bg-white shadow-md" action={loginAction}>
        <h1 className="text-2xl font-bold text-center mb-2">Login Form</h1>
     
        <input type="email" placeholder="enter a email" name="email" className="border p-2 rounded"/>
        <input type="password" placeholder="enter a password" name="password" className="border p-2 rounded"/>
         <button type="submit" className="bg-black text-white p-2 rounded" > Login </button>
        </form>
        </div>
    )
}