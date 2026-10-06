import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function requireAuth() {
    const cookieStoreget = await cookies();
    const token = cookieStoreget.get("token");

    if (!token) {
        redirect("/login");
    }
    return;
}
