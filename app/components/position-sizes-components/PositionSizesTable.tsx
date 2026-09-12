"use client";
import Link from "next/link";
import { MAKey, StockInfoType, Trade } from "../../lib/types";
import { useState } from "react";

export interface PositionsTableProps {
  data: StockInfoType[];
  serverAction: (formData: FormData) => Promise<void>;
  accBal: string;
  stopLoss: string;
  handleTrade: (stock: StockInfoType) => void;
  trade: boolean;
  trades: Trade[];
}

const PositionSizesTable = ({
  data,
  serverAction,
  accBal,
  stopLoss,
  handleTrade,
  trade,
  trades,
}: PositionsTableProps) => {
  const [selectedMA, setSelectedMA] = useState<MAKey>("10D");
  const [sortColumn, setSortColumn] = useState({ key: "ticker", dir: "asc" });

  const handleSelectMA = (ma: MAKey) => {
    setSelectedMA(ma);
  };

  const handleSortDir = (col: string) => {
    if (sortColumn.dir === "asc") {
      setSortColumn({ key: col, dir: "dsc" });
    }
    if (sortColumn.dir === "dsc") {
      setSortColumn({ key: col, dir: "asc" });
    }
  };

  const avgAmt = Number(accBal) / data.length;

  const getPositionSize = (ticker: string) => {
    let numShares = 0;
    trades.forEach((trade: Trade) => {
      if (trade.ticker === ticker) {
        if (trade.type === "Buy") {
          numShares += trade.shares;
        }
        if (trade.type === "Sell") {
          numShares -= trade.shares;
        }
      }
    });
    return numShares;
  };

  const getAvgCost = (ticker: string) => {
    let cost = 0;
    let numShares = 0;
    trades.forEach((trade: Trade) => {
      if (trade.ticker === ticker) {
        if (trade.type === "Buy") {
          cost += trade.dollarAmount;
          numShares += trade.shares;
        }
        if (trade.type === "Sell") {
          cost -= trade.dollarAmount;
          numShares -= trade.shares;
        }
      }
    });

    return Number(cost) / Number(numShares) || 0;
  };

  return (
    <table className="table overflow-auto">
      <thead>
        <tr className={`sticky ${trade ? "top-10" : "top-0"} bg-white`}>
          <th></th>
          <th
            onClick={() => handleSortDir("ticker")}
            className={`cursor-pointer`}
          >
            Ticker
          </th>
          <th>PosSize</th>
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
            onClick={() => handleSortDir("pctAbvMA")}
            className={`cursor-pointer`}
          >
            Cl&gt;MA
          </th>
          <th>Entry</th>
          {/* <th>Loss $</th> */}
          <th>AvgCost</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data
          .sort((a, b) => {
            const aPct = ((a.Close - (a[selectedMA] ?? 0)) / a.Close) * 100;
            const bPct = ((b.Close - (b[selectedMA] ?? 0)) / b.Close) * 100;
            console.log(sortColumn);

            if (sortColumn.key === "ticker") {
              if (sortColumn.dir === "asc") {
                return b.ticker.localeCompare(a.ticker);
              }
              return a.ticker.localeCompare(b.ticker);
            } else {
              if (sortColumn.dir === "asc") {
                return bPct - aPct;
              }
              return aPct - bPct;
            }
          })
          .map((stock) => {
            const pctAbvMA =
              ((stock.Close - (stock[selectedMA] ?? 0)) / stock.Close) * 100;

            const entry = (Number(stopLoss) / pctAbvMA) * avgAmt;
            const posSize = (
              getPositionSize(stock.ticker) * stock.Close
            ).toFixed(2);

            return (
              <tr
                key={stock._id}
                className={`${pctAbvMA < 0 && `text-red-600`}`}
              >
                <td>
                  <button onClick={() => handleTrade(stock)} className="btn">
                    Trade
                  </button>
                </td>
                <td>{stock.ticker}</td>
                <td>${posSize}</td>
                <td>{stock.Time}</td>
                <td>{stock.Close}</td>
                <td
                  className={`${Number(stock.Close) < Number(stock["5D"] ?? 0) && `text-red-500`}`}
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
                <td>{pctAbvMA.toFixed(2)}%</td>
                <td>${entry.toFixed(2)}</td>
                {/* <td>{(entry * (pctAbvMA / 100)).toFixed(2)}</td> */}
                {/* <td>{stock.averageCost}</td> */}
                <td>${getAvgCost(stock.ticker).toFixed(2)}</td>

                <td>
                  <form action={serverAction}>
                    <input type="hidden" name="id" value={stock._id} />
                    <button className="btn">Watch</button>
                  </form>
                </td>
                <td>
                  <Link
                    href={`/dashboard/edit-stock/${stock._id}`}
                    className="btn"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default PositionSizesTable;
