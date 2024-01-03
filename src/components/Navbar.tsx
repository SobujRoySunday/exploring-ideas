import { getSession } from "@/helpers/getSession"
import Link from "next/link"
import Logout from "./Logout"

const Navbar = () => {
  const session = getSession()
  return (
    <div><div className="navbar bg-base-100 shadow-md">
      <div className="flex-1">
        <Link href='/' className="btn btn-ghost text-xl">Sharing Ideas</Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {session ? <Logout /> : <Link className="btn btn-secondary" href='/signin'>Sign in</Link>}

          {/* <li>
            <details>
              <summary>
                Parent
              </summary>
              <ul className="p-2 bg-base-100 rounded-t-none">
                <li><a>Link 1</a></li>
                <li><a>Link 2</a></li>
              </ul>
            </details>
          </li> */}
        </ul>
      </div>
    </div></div>
  )
}

export default Navbar