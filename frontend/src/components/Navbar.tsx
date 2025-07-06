
import { useSelector } from "react-redux";

function Navbar() {
const storedUser = localStorage.getItem("user");
let parsedUser = null;

try {
  parsedUser = storedUser ? JSON.parse(storedUser) : null;
} catch (err) {
  console.error("Error parsing user from localStorage:", err);
}

const reduxUser = useSelector((state: any) => state.user);
const user = parsedUser || reduxUser;  console.log(user);

  return (
    <>
      <div className="navbar bg-base-300 shadow-sm">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Task Manager</a>
        </div>
        {user &&  (
          <div className="flex gap-2">
            <div className="my-2"> Welcome {user?.username}</div>
            <div className="dropdown dropdown-end mx-10">
            
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                </li>
              </ul>
            </div>
          </div>
        )}
        <button onClick={()=>{
          localStorage.removeItem("user");
          window.location.href = "/login";
        }}>Logout</button>
      </div>
    </>
  );
}

export default Navbar;
