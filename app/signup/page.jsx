"use client"
import signUp from "../../actions/signupForm"
export default function signUP(){
    return(
     <div className="flex items-center justify-center mt-6">
        <form className="flex flex-col gap-3 w-80 p-6 border rounded-lg bg-white shadow-md" action={signUp}>
        <h1 className="text-2xl font-bold text-center mb-2">Create SignUp Form</h1>
        <input type="text" placeholder="enter a username" name="username" className="border p-2 rounded" />
        <input type="email" placeholder="enter a email" name="email" className="border p-2 rounded"/>
        <input type="password" placeholder="enter a password" name="password" className="border p-2 rounded"/>
        <select name="role" className="border p-2 rounded">
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
         <button type="submit" className="bg-black text-white p-2 rounded">SignUp</button>
        </form>
        </div>
    )
}