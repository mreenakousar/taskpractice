import logoutAction from "../../actions/logout";

 export default function Adminpage () {
  return (
    <div>Admin Page
     <form action={logoutAction}>
                    <button type="submit" className="bg-black text-white p-2 rounded">
                        Logout
                    </button>
                </form>
                </div>
  )
}

