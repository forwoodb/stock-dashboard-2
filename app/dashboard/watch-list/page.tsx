import { connectDb } from "@/app/lib/mongodb";
import { StockType } from "@/app/lib/types";
import Stock from "@/app/models/Stock";
import fs from "fs";
import { parse } from "csv-parse/sync";
import { revalidatePath } from "next/cache";
import WatchListTable from "@/app/components/WatchListTable";
import { csvRow } from "@/app/lib/types";

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
    await connectDb();

    const id = formData.get("id");

    await Stock.findByIdAndUpdate(id, {
      watchList: false,
      position: true,
    });

    revalidatePath("/dashboard/watch-list");
  };

  return (
    <div>
      <h1>Watch List Page</h1>
      <WatchListTable data={merge} formAction={toPosition} />
    </div>
  );
};

export default WatchlistPage;
