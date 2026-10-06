// import { requireAuth } from "@/components/authorization";
import logoutAction from "../../actions/logout";
import { verifyToken } from "@/components/lib/verifyToken";
import { redirect } from "next/navigation";
async function pageabout() {
    // await requireAuth();
const user = await verifyToken();
if (!user) {
  redirect("/login");
}
    return (
        <div>
            <h1>About Page</h1>
             <p>ID: {user.id}</p>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <form action={logoutAction}>
                <button type="submit" className="bg-black text-white p-2 rounded">
                    Logout
                </button>
            </form>
        </div>
    )
}

export default pageabout;