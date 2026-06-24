import { connectDb } from "@/app/lib/mongodb";
import Stock from "@/app/models/Stock";
import { StockType } from "@/app/lib/types";

const PositionsPage = async () => {
  await connectDb();

  const data = await Stock.find({ position: true }).lean();
  const stocks: StockType[] = JSON.parse(JSON.stringify(data));
  console.log(stocks);

  return (
    <main>
      <h1>Position Sizes Page</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>AvgCost</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => {
            return (
              <tr key={stock._id}>
                <td>{stock.ticker}</td>
                <td>{stock.averageCost}</td>
                <td>
                  <button className="btn">Watch</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
};

export default PositionsPage;
