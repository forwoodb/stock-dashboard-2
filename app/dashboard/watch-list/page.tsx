import { connectDb } from "@/app/lib/mongodb";
import Stock from "@/app/models/Stock";

const WatchlistPage = async () => {
  await connectDb();

  const data = await Stock.find({}).lean();
  const stocks = JSON.parse(JSON.stringify(data));
  console.log(stocks);

  return (
    <div>
      <h1>Watch List Page</h1>
      <table>
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
