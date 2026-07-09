import { revalidatePath } from "next/cache";
import { User } from "../models/User";

const StopLossForm = ({ user }) => {
  const updateStopLoss = async (formData: FormData) => {
    "use server";
    const stop = formData.get("stopLoss");
    console.log(stop);

    await User.findByIdAndUpdate(user._id, { stopLoss: stop });

    revalidatePath("/dashboard/position-sizes");
  };

  return (
    <form
      action={updateStopLoss}
      className="p-3 mb-3 md:mr-3 bg-white rounded border border-gray-300"
    >
      <label className="floating-label">
        <span>Stop-Loss %</span>
        <input
          type="text"
          name="stopLoss"
          placeholder="Stop-Loss %"
          className="input input-md"
        />
      </label>
      <button className="btn">Update Stop-Loss</button>
    </form>
  );
};

export default StopLossForm;
