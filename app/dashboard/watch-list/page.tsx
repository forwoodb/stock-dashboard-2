import { connectDb } from "@/app/lib/mongodb";
import { StockType } from "@/app/lib/types";
import Stock from "@/app/models/Stock";
import fs from "fs";
import { parse } from "csv-parse/sync";

const WatchlistPage = async () => {
  await connectDb();

  const data = await Stock.find({ watchList: true }).lean();
  const stocks: StockType[] = JSON.parse(JSON.stringify(data));

  // Get CSV data
  const csv = fs.readFileSync("csv_data.csv", "utf-8");

  const stockData = parse(csv, { columns: true });

  const merge = stocks.map((stock) => {
    const csvRow = stockData.find((i) => {
      return i.ticker === stock.ticker;
    });
    return { ...stock, ...csvRow };
  });
  console.log(merge);

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
          {merge.map((stock) => {
            return (
              <tr key={stock._id}>
                <td>{stock.ticker}</td>
                <td>{stock["10D"]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default WatchlistPage;
