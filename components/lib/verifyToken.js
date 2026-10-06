import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function verifyToken() { 
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return null; 
    const user = jwt.verify(token, process.env.JWT_SECRET);
    return user;
}








// Next.js ka cookies function import kar rahe ho.Ye server par browser ki cookies ko read/set/delete karne ke liye use hota hai.

 // token mein se  value nikalne ke liye cookies() ka use karenge
  // Yahan cookies() browser ki cookies ka store/object deta hai.
   // value contains the actual JWT token.  Agar aapko poora object chahiye to aap cookieStore.get("token") use kar sakte ho. Lekin humein sirf us object ke andar actual JWT token chahiye, isliye hum .value use kar rahe hain.
    // Cookies mein "token" naam ki cookie dhoondo.  Ab .value kyun? Aapko poora object nahi chahiye. Aapko us object ke andar actual JWT token chahiye.  "token" naam ki cookie dhoondo aur uski actual value mujhe de do.  
// cookieStore.get("token")ye cookie object deta hai: