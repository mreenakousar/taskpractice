"use server"
import { connectDB } from "@/database/dbConnect";
import Signup from "@/models/signupSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export default async function signupAction(formData){

    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const role = formData.get("role");
    console.log(username, email, password, role);
    await connectDB();
     const hashPassword = await bcrypt.hash(password, 12);
     console.log("Hashed Password:", hashPassword);
    const signupuser = await Signup.create({
        username,
        email,
        password: hashPassword,
        role
    });
       const signupToken = jwt.sign(
        {
            id: signupuser._id,
            username: signupuser.username,
            email: signupuser.email,
            password:signupuser.password,
            role: signupuser.role
        },
        process.env.JWT_SECRET,
         {
        expiresIn: "24h"
    }
    );
    const cookiesignupStore = await cookies();
    cookiesignupStore.set("token", signupToken,{
        httpOnly: true,
       
    });
    
    console.log("Signup Token saved in cookie");
   if (signupuser.role === "admin") {
    redirect("/admin");
}

redirect("/about");
}