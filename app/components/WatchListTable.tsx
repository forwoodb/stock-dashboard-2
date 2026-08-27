"use client";
import { useState } from "react";
import { MAKey, StockInfoType } from "../lib/types";

interface WatchListProps {
  mode: string;
  data: StockInfoType[];
  formAction: (formData: FormData) => Promise<void>;
}

const WatchListTable = ({ mode, data, formAction }: WatchListProps) => {
  const [selectedMA, setSelectedMA] = useState<MAKey>("10D");
  const [sortColumn, setSortColumn] = useState("ticker");

  const handleSelectMA = (ma: MAKey) => {
    setSelectedMA(ma);
  };

  const handleSort = (col: string) => {
    setSortColumn(col);
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th onClick={() => handleSort("ticker")} className={`cursor-pointer`}>
            Ticker
          </th>
          <th>Time</th>
          <th>Close</th>
          <th
            onClick={() => handleSelectMA("5D")}
            className={`cursor-pointer ${selectedMA === "5D" && "border border-black"}`}
          >
            5D
          </th>
          <th
            onClick={() => handleSelectMA("10D")}
            className={`cursor-pointer ${selectedMA === "10D" && "border border-black"}`}
          >
            10D
          </th>
          <th
            onClick={() => handleSelectMA("20D")}
            className={`cursor-pointer ${selectedMA === "20D" && "border border-black"}`}
          >
            20D
          </th>
          <th
            onClick={() => handleSelectMA("50D")}
            className={`cursor-pointer ${selectedMA === "50D" && "border border-black"}`}
          >
            50D
          </th>
          <th
            onClick={() => handleSelectMA("100D")}
            className={`cursor-pointer ${selectedMA === "100D" && "border border-black"}`}
          >
            100D
          </th>
          <th
            onClick={() => handleSelectMA("200D")}
            className={`cursor-pointer ${selectedMA === "200D" && "border border-black"}`}
          >
            200D
          </th>
          <th
            onClick={() => handleSort("pctAbvMA")}
            className={`cursor-pointer`}
          >
            Cl&gt;MA
          </th>
        </tr>
      </thead>
      <tbody>
        {data
          .sort((a, b) => {
            const aPct = ((a.Close - (a[selectedMA] ?? 0)) / a.Close) * 100;
            const bPct = ((b.Close - (b[selectedMA] ?? 0)) / b.Close) * 100;

            if (sortColumn === "ticker") {
              return a.ticker.localeCompare(b.ticker);
            } else {
              return bPct - aPct;
            }
          })
          .map((stock) => {
            const pctAbvMa = (((stock.Close - (stock[selectedMA] ?? 0)) /
              stock.Close) *
              100) as number;

            return (
              <tr
                key={stock._id}
                className={`${pctAbvMa < 0 && `text-red-600`}`}
              >
                <td>{stock.ticker}</td>
                <td>{stock.Time}</td>
                <td>{stock.Close}</td>
                <td
                  className={
                    Number(stock.Close) < Number(stock["5D"] ?? 0)
                      ? `text-red-500`
                      : (stock["5D"] ?? 0) > (stock[selectedMA] ?? 0)
                        ? `text-green-500`
                        : ""
                  }
                >
                  {stock["5D"]}
                </td>
                <td
                  className={`${Number(stock.Close) < Number(stock["10D"] ?? 0) && `text-red-500`}`}
                >
                  {stock["10D"]}
                </td>
                <td
                  className={`${Number(stock.Close) < Number(stock["20D"] ?? 0) && `text-red-500`}`}
                >
                  {stock["20D"]}
                </td>
                <td
                  className={`${Number(stock.Close) < Number(stock["50D"] ?? 0) && `text-red-500`}`}
                >
                  {stock["50D"]}
                </td>
                <td
                  className={`${Number(stock.Close) < Number(stock["100D"] ?? 0) && `text-red-500`}`}
                >
                  {stock["100D"]}
                </td>
                <td
                  className={`${Number(stock.Close) < Number(stock["200D"] ?? 0) && `text-red-500`}`}
                >
                  {stock["200D"]}
                </td>
                {/* <td className={pctAbvMa < 0 && `text-red`}> */}
                <td>{pctAbvMa.toFixed(2)}%</td>
                <td>
                  <form action={formAction}>
                    <input type="hidden" name="id" value={stock._id} />
                    <button className="btn">
                      {mode === "watchList" ? "Position" : "WatchList"}
                    </button>
                  </form>
                </td>
                <td>
                  <button className="btn">Edit</button>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default WatchListTable;
