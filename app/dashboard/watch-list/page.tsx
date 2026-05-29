import { connectDb } from "@/app/lib/mongodb";
import { StockType } from "@/app/lib/types";
import Stock from "@/app/models/Stock";

const WatchlistPage = async () => {
  await connectDb();

  const data = await Stock.find({ watchList: true }).lean();
  const stocks: StockType[] = JSON.parse(JSON.stringify(data));
  // console.log(stocks);

  return (
    <div>
      <h1>Watch List Page</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Ticker</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => {
            return (
              <tr key={stock._id}>
                <td>{stock.ticker}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default WatchlistPage;
