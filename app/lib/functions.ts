import fs from "fs";
import { parse } from "csv-parse/sync";
import { csvRow, StockType } from "@/app/lib/types";

export const mergeCSVData = (list: StockType[]) => {
  // Get CSV data
  const csv = fs.readFileSync("csv_data.csv", "utf-8");

  const stockData = parse(csv, { columns: true }) as csvRow[];

  const merge = list.map((stock) => {
    const csvRow = stockData.find((i) => {
      return i.ticker === stock.ticker;
    });
    return { ...stock, ...csvRow };
  });

  return merge;
};
