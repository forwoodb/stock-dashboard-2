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

  const selectMA = (id) => {
    console.log("click");
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Ticker</th>
          <th>Time</th>
          <th>Close</th>
          <th id="5D" onClick={selectMA}>
            5D
          </th>
          <th id="10D" onClick={selectMA}>
            10D
          </th>
          <th id="20D" onClick={selectMA}>
            20D
          </th>
          <th id="50D" onClick={selectMA}>
            50D
          </th>
          <th id="100D" onClick={selectMA}>
            100D
          </th>
          <th id="200D" onClick={selectMA}>
            200D
          </th>
          <th>Cl&gt;MA</th>
        </tr>
      </thead>
      <tbody>
        {data.map((stock) => {
          const pctAbvMa = stock.Close - stock[selectedMA];
          let textColor;
          if (pctAbvMa < 0) {
            textColor = "red";
          }
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
