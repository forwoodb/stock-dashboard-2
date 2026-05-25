import { User } from "@/app/models/User";
import { redirect } from "next/navigation";

interface EditPageProps {
  params: Promise<{ id: string }>;
}

const EditUserPage = async ({ params }: EditPageProps) => {
  const { id } = await params;

  const data = await User.findOne({ _id: id }).lean();
  const user = JSON.parse(JSON.stringify(data));

  const updateUser = async (formData: FormData) => {
    "use server";

    const name = formData.get("name");
    const email = formData.get("email");
    const role = formData.get("role");

    await User.findByIdAndUpdate(id, { name, email, role });

    redirect("/admin");
  };

  return (
    <main>
      <h1>Edit User Page</h1>
      <form
        action={updateUser}
        className="flex flex-col gap-4 w-xs p-4 mx-auto"
      >
        <input type="text" name="name" value={user.name} className="input" />
        <input type="text" name="email" value={user.email} className="input" />
        <select name="role" id="role" className="select">
          <option value="user" selected={user.role === "user"}>
            User
          </option>
          <option value="admin" selected={user.role === "admin"}>
            Admin
          </option>
        </select>
        <button className="btn">Update </button>
      </form>
    </main>
  );
};

export default EditUserPage;
