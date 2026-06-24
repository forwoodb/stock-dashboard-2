import { connectDb } from "@/app/lib/mongodb";
import { StockType } from "@/app/lib/types";
import Stock from "@/app/models/Stock";
import fs from "fs";
import { parse } from "csv-parse/sync";

interface csvRow {
  ticker: string;
  Time: string;
  Close: number;
  "5D": number;
  "10D": number;
  "20D": number;
  "50D": number;
  "100D": number;
  "200D": number;
}

const WatchlistPage = async () => {
  await connectDb();

  const data = await Stock.find({ watchList: true }).lean();
  const stocks: StockType[] = JSON.parse(JSON.stringify(data));

  // Get CSV data
  const csv = fs.readFileSync("csv_data.csv", "utf-8");

  const stockData = parse(csv, { columns: true }) as csvRow[];

  const merge = stocks.map((stock) => {
    const csvRow = stockData.find((i) => {
      return i.ticker === stock.ticker;
    });
    return { ...stock, ...csvRow };
  });

  const toPosition = async (formData: FormData) => {
    "use server";
    console.log("click");
  };

  return (
    <div>
      <h1>Watch List Page</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Ticker</th>
            <th>Time</th>
            <th>Close</th>
            <th>5D</th>
            <th>10D</th>
            <th>20D</th>
            <th>50D</th>
            <th>100D</th>
            <th>200D</th>
          </tr>
        </thead>
        <tbody>
          {merge.map((stock) => {
            return (
              <tr key={stock._id}>
                <td>{stock.ticker}</td>
                <td>{stock.Time}</td>
                <td>{stock.Close}</td>
                <td>{stock["5D"]}</td>
                <td>{stock["10D"]}</td>
                <td>{stock["20D"]}</td>
                <td>{stock["50D"]}</td>
                <td>{stock["100D"]}</td>
                <td>{stock["200D"]}</td>
                <td>
                  <form action={toPosition}>
                    <button className="btn">Position</button>
                  </form>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default WatchlistPage;
