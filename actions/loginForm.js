"use server"
import { connectDB } from "@/database/dbConnect";
import Signup from "@/models/signupSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function loginAction(formData) {
    const email = formData.get("email");
    const password = formData.get("password");
    console.log(email, password);
    await connectDB();
    const user = await Signup.findOne({ email });


    if (await bcrypt.compare(password, user.password)) {
        console.log("Login successful");

        const token = jwt.sign(
            {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "24h"
            }
        );

        const cookieStore = await cookies();
        cookieStore.set("token", token,
            {
                httpOnly: true,

            }
        );
        if (user.role === "admin") {
            redirect("/admin");
        }
        redirect("/about");

    } else {
        console.log("Credentials wrong");
    }

}
