import { revalidatePath } from "next/cache";
import { User } from "../../models/User";
import { connectDb } from "../../lib/mongodb";
import { UserType } from "../../lib/types";

interface AccountFormPropTypes {
  user: UserType;
}

const AccountBalanceForm = ({ user }: AccountFormPropTypes) => {
  const updateBalance = async (formData: FormData) => {
    "use server";
    await connectDb();

    const balance = formData.get("accountBalance");

    await User.findByIdAndUpdate(user._id, { accountBalance: balance }); // should be user._id, but is still working for some reason

    revalidatePath("/dashboard/position-sizes");
  };

  return (
    <div>
      <form
        action={updateBalance}
        className="p-3 mb-3 md:mr-3 bg-white rounded border border-gray-300"
      >
        <label className="floating-label">
          <span>Account Balance</span>
          <input
            type="text"
            name="accountBalance"
            placeholder="Account Balance"
            className="input input-md"
          />
        </label>
        <button className="btn">Update Account Balance</button>
      </form>
    </div>
  );
};

export default AccountBalanceForm;
