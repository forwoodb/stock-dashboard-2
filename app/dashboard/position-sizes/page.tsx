import { connectDb } from "@/app/lib/mongodb";
import Stock from "@/app/models/Stock";

const PositionsPage = async () => {
  await connectDb();

  const stocks = await Stock.find({ position: true });
  console.log(stocks);

  return (
    <main>
      <h1>Position Sizes Page</h1>
    </main>
  );
};

export default PositionsPage;
