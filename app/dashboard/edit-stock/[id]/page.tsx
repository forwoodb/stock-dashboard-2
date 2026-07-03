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
        <input type="text" />
        <button>Update</button>
      </form>
    </main>
  );
};

export default EditStockPage;
