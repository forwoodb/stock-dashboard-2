import { headers } from "next/headers";
import { auth } from "../lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

const AuthButton = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const logoutUserAction = async () => {
    "use server";

    await auth.api.signOut({
      headers: await headers(),
    });

    redirect("/auth/login");
  };

  return (
    <div>
      {session ? (
        <form action={logoutUserAction}>
          <button className="btn">Log Out</button>
        </form>
      ) : (
        <Link href={"/auth/login"} className="btn">
          Log In/Register
        </Link>
      )}
    </div>
  );
};

export default AuthButton;
