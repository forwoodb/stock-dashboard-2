import { revalidatePath } from "next/cache";
import { connectDb } from "../lib/mongodb";
import { User } from "../models/User";
import Link from "next/link";
import { auth } from "../lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

interface UserType {
  _id: string;
  name: string;
  email: string;
  role: string;
}

const AdminPage = async () => {
  await connectDb();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Uncomment this once admin user(s) is created
  // if (session?.user.role !== "admin") {
  //   redirect("/");
  // }

  // console.log(session);

  // Get users
  const data = await User.find({}).lean();
  const users = JSON.parse(JSON.stringify(data));

  // Delete a user
  const deleteUserAction = async (formData: FormData) => {
    "use server";
    await connectDb();

    const id = formData.get("id");

    await User.findByIdAndDelete(id);

    revalidatePath("/admin");
  };

  return (
    <main>
      <h1>Admin Page</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {(await users).map((user: UserType) => {
            return (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <Link href={`/admin/edit/${user._id}`} className="btn">
                    Edit
                  </Link>
                </td>
                <td>
                  <form action={deleteUserAction}>
                    <input type="hidden" name="id" value={user._id} />
                    <button className="btn">Delete</button>
                  </form>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
};

export default AdminPage;
