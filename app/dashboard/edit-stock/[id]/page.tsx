import { connectDb } from "@/app/lib/mongodb";
import Stock from "@/app/models/Stock";
import { redirect } from "next/navigation";

type EditPageProps = {
  params: Promise<{ id: string }>;
};

const EditStockPage = async ({ params }: EditPageProps) => {
  await connectDb();

  const { id } = await params;

  const data = await Stock.findOne({ _id: id }).lean();
  const stock = JSON.parse(JSON.stringify(data));

  const updateStockAction = async (formData: FormData) => {
    "use server";
    const data = Object.fromEntries(formData);

    await Stock.findByIdAndUpdate(id, data);

    redirect("/dashboard/position-sizes");
  };

  return (
    <main>
      <h1>Edit Stock Page</h1>
      <form
        action={updateStockAction}
        className="flex flex-col items-center w-[50%] mx-auto "
      >
        <label className="floating-label">
          <span>Ticker</span>
          <input
            type="text"
            placeholder="Ticker"
            name="ticker"
            defaultValue={stock.ticker}
            className="input input-md"
          />
        </label>
        <label className="floating-label">
          <span>Company</span>
          <input
            type="text"
            placeholder="Company"
            name="company"
            defaultValue={stock.company}
            className="input input-md"
          />
        </label>
        <label className="floating-label">
          <span>Position Size</span>
          <input
            type="text"
            placeholder="Position Size"
            name="positionSize"
            defaultValue={stock.positionSize}
            className="input input-md"
          />
        </label>
        <label className="floating-label">
          <span>Average Cost</span>
          <input
            type="text"
            placeholder="Average Cost"
            name="averageCost"
            defaultValue={stock.averageCost}
            className="input input-md"
          />
        </label>
        <button className="btn">Update</button>
      </form>
    </main>
  );
};

export default EditStockPage;
