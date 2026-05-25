import { headers } from "next/headers";
import { auth } from "../lib/auth";
import Navbar from "./Navbar";

const Header = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div>
      <Navbar />
      {session && <p>Hello {session?.user.name}</p>}
    </div>
  );
};

export default Header;
