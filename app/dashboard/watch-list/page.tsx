import { connectDb } from "@/app/lib/mongodb";
import Stock from "@/app/models/Stock";

const WatchlistPage = async () => {
  await connectDb();

  const stocks = await Stock.find({});
  console.log(stocks);

  return (
    <div>
      <h1>Watch List Page</h1>
    </div>
  );
};

export default WatchlistPage;
