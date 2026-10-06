"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function logoutAction() {
    const cookiesdelete = await cookies();
    cookiesdelete.delete("token");
    redirect("/login");
}