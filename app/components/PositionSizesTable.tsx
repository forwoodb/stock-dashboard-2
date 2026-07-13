"use client";
import Link from "next/link";
import { StockInfoType } from "../lib/types";
import { useState } from "react";

interface TableProps {
  data: StockInfoType[];
  serverAction: (formData: FormData) => Promise<void>;
}

const PositionSizesTable = ({ data, serverAction }: TableProps) => {
  const [selectedMA, setSelectedMA] = useState("10D");

  const handleSelectMA = (ma) => {
    setSelectedMA(ma);
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Ticker</th>
          <th>Time</th>
          <th>Close</th>
          <th onClick={() => handleSelectMA("5D")} className={`cursor-pointer`}>
            5D
          </th>
          <th
            onClick={() => handleSelectMA("10D")}
            className={`cursor-pointer`}
          >
            10D
          </th>
          <th
            onClick={() => handleSelectMA("20D")}
            className={`cursor-pointer`}
          >
            20D
          </th>
          <th
            onClick={() => handleSelectMA("50D")}
            className={`cursor-pointer`}
          >
            50D
          </th>
          <th
            onClick={() => handleSelectMA("100D")}
            className={`cursor-pointer`}
          >
            100D
          </th>
          <th
            onClick={() => handleSelectMA("200D")}
            className={`cursor-pointer`}
          >
            200D
          </th>
          <th>AvgCost</th>
          <th>PosSize</th>
        </tr>
      </thead>
      <tbody>
        {data.map((stock) => {
          const pctAbvMA = stock.Close - stock[selectedMA];
          return (
            <tr key={stock._id} className={pctAbvMA < 0 && `text-red-500`}>
              <td>{stock.ticker}</td>
              <td>{stock.Time}</td>
              <td>{stock.Close}</td>
              <td>{stock["5D"]}</td>
              <td>{stock["10D"]}</td>
              <td>{stock["20D"]}</td>
              <td>{stock["50D"]}</td>
              <td>{stock["100D"]}</td>
              <td>{stock["200D"]}</td>
              <td>{stock.averageCost}</td>
              <td>{stock.positionSize}</td>
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
