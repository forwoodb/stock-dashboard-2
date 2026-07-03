import { connectDb } from "@/app/lib/mongodb";
import Stock from "@/app/models/Stock";

type EditPageProps = {
  params: Promise<{ id: string }>;
};

const EditStockPage = async ({ params }: EditPageProps) => {
  await connectDb();

  const { id } = await params;

  const data = await Stock.findOne({ _id: id }).lean();
  const stock = JSON.parse(JSON.stringify(data));

  console.log(stock);

  return (
    <main>
      <h1>Edit Stock Page</h1>
      <form action="">
        <label className="floating-label">
          <span>Ticker</span>
          <input type="text" placeholder="Ticker" className="input input-md" />
        </label>
        <label className="floating-label">
          <span>Company</span>
          <input type="text" placeholder="Company" className="input input-md" />
        </label>
        <label className="floating-label">
          <span>Position Size</span>
          <input
            type="text"
            placeholder="Position Size"
            className="input input-md"
          />
        </label>
        <label className="floating-label">
          <span>Average Cost</span>
          <input
            type="text"
            placeholder="Average Cost"
            className="input input-md"
          />
        </label>
        <input type="text" />
        <button>Update</button>
      </form>
    </main>
  );
};

export default EditStockPage;
