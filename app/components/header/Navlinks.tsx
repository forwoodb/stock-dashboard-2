"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Navlinks = () => {
  const path = usePathname();

  console.log(path);

  return (
    <>
      <li>
        <Link href={"/"} className={`${path === "/" && "text-white bg-black"}`}>
          Home
        </Link>
      </li>
      <li>
        <Link
          href={"/dashboard/stocks"}
          className={`${path === "/dashboard/stocks" && "text-white bg-black"}`}
        >
          Stocks
        </Link>
      </li>
      <li>
        <Link
          href={"/dashboard/watch-list"}
          className={`${path === "/dashboard/watch-list" && "text-white bg-black"}`}
        >
          Watch List
        </Link>
      </li>
      <li>
        <Link
          href={"/dashboard/position-sizes"}
          className={`${path === "/dashboard/position-sizes" && "text-white bg-black"}`}
        >
          Positions
        </Link>
      </li>
      <li>
        <Link
          href={"/dashboard/trades"}
          className={`${path === "/dashboard/trades" && "text-white bg-black"}`}
        >
          Trades
        </Link>
      </li>
      <li>
        <Link
          href={"/admin"}
          className={`${path === "/admin" && "text-white bg-black"}`}
        >
          Admin
        </Link>
      </li>
    </>
  );
};

export default Navlinks;
