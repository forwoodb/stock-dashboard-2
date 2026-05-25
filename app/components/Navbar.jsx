import AuthButton from "./AuthButton";
import Link from "next/link";

const Navbar = () => {
  return (
    <div class="navbar bg-base-100 shadow-sm">
      <div class="navbar-start">
        <div class="dropdown">
          <div tabIndex="0" role="button" class="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            <li>
              <Link href={"/protected-route"}>Protected</Link>
            </li>
            <li>
              <Link href={"/admin"}>Admin</Link>
            </li>
          </ul>
        </div>
        <a class="btn btn-ghost text-xl">AuthStarter</a>
      </div>
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1">
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li>
            <Link href={"/protected-route"}>Protected</Link>
          </li>
          <li>
            <Link href={"/admin"}>Admin</Link>
          </li>
        </ul>
      </div>
      <div class="navbar-end">
        <AuthButton />
      </div>
    </div>
  );
};

export default Navbar;
