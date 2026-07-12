"use client";
import { useState } from "react";
import { StockInfoType } from "../lib/types";

interface WatchListProps {
  mode: string;
  data: StockInfoType[];
  formAction: (formData: FormData) => Promise<void>;
}

const WatchListTable = ({ mode, data, formAction }: WatchListProps) => {
  const [selectedMA, setSelectedMA] = useState("10D");

  const selectMA = (ma) => {
    console.log(ma);
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Ticker</th>
          <th>Time</th>
          <th>Close</th>
          <th onClick={() => selectMA("5D")}>5D</th>
          <th onClick={() => selectMA("10D")}>10D</th>
          <th onClick={() => selectMA("20D")}>20D</th>
          <th onClick={() => selectMA("50D")}>50D</th>
          <th onClick={() => selectMA("100D")}>100D</th>
          <th onClick={() => selectMA("200D")}>200D</th>
          <th>Cl&gt;MA</th>
        </tr>
      </thead>
      <tbody>
        {data.map((stock) => {
          const pctAbvMa = (stock.Close - stock[selectedMA]) as number;

          return (
            <tr key={stock._id} className={pctAbvMa < 0 && `text-red-600`}>
              <td>{stock.ticker}</td>
              <td>{stock.Time}</td>
              <td>{stock.Close}</td>
              <td>{stock["5D"]}</td>
              <td>{stock["10D"]}</td>
              <td>{stock["20D"]}</td>
              <td>{stock["50D"]}</td>
              <td>{stock["100D"]}</td>
              <td>{stock["200D"]}</td>
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
