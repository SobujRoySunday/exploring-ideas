import Link from "next/link"

const Navbar = () => {
  return (
    <div><div className="navbar bg-base-100 shadow-md">
      <div className="flex-1">
        <Link href='/' className="btn btn-ghost text-xl">TINT Academy</Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li className="btn btn-primary"><Link href='/signin'>Sign in</Link></li>
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