import { connectDb } from "@/app/lib/mongodb";
import Stock from "@/app/models/Stock";
import { csvRow, StockType } from "@/app/lib/types";
import fs from "fs";
import { parse } from "csv-parse/sync";

const PositionsPage = async () => {
  await connectDb();

  const data = await Stock.find({ position: true }).lean();
  const stocks: StockType[] = JSON.parse(JSON.stringify(data));

  const csv = fs.readFileSync("csv_data.csv", "utf-8");

  const stockData = parse(csv, { columns: true }) as csvRow[];
  console.log(stockData);

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
