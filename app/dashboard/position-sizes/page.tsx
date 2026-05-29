import { connectDb } from "@/app/lib/mongodb";
import Stock from "@/app/models/Stock";

const PositionsPage = async () => {
  await connectDb();

  const data = await Stock.find({ position: true }).lean();
  const stocks = JSON.parse(JSON.stringify(data));
  console.log(stocks);

  return (
    <main>
      <h1>Position Sizes Page</h1>
    </main>
  );
};

export default PositionsPage;
