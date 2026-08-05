// import { usePathname } from "next/navigation";
import Link from "next/link";

const Navlinks = () => {
  // const path = usePathname();

  return (
    <>
      <li>
        <Link href={"/"}>Home</Link>
      </li>
      <li>
        <Link href={"/dashboard/stocks"}>Stocks</Link>
      </li>
      <li>
        <Link href={"/dashboard/watch-list"}>Watch List</Link>
      </li>
      <li>
        <Link href={"/dashboard/position-sizes"}>Positions</Link>
      </li>
      <li>
        <Link href={"/dashboard/trades"}>Trades</Link>
      </li>
      <li>
        <Link href={"/admin"}>Admin</Link>
      </li>
    </>
  );
};

export default Navlinks;
