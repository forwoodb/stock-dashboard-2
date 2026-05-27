"use client";
import Link from "next/link";
import { useState } from "react";

const StocksTable = ({ stocks, deleteStock }) => {
  const [sortedStocks, setSortedStocks] = useState([]);

  const sortTable = (key) => {
    console.log(typeof key);

    const sorted = stocks
      .map((stock) => {
        return stock;
      })
      .sort((a, b) => {
        return a[key].localeCompare(b[key]);
      });

    setSortedStocks(sorted);
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th onClick={() => sortTable("ticker")}>Ticker</th>
          <th onClick={() => sortTable("company")}>Company</th>
        </tr>
      </thead>
      <tbody>
        {/* {stocks.map((stock) => { */}
        {sortedStocks.map((stock) => {
          return (
            <tr key={stock._id}>
              <td>{stock.ticker}</td>
              <td>{stock.company}</td>
              <td>
                <Link
                  href={`/dashboard/stocks/edit/${stock._id}`}
                  className="btn"
                >
                  Edit
                </Link>
              </td>
              <td>
                <form action={deleteStock}>
                  <input type="hidden" name="id" defaultValue={stock._id} />
                  <button className="btn">Delete</button>
                </form>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default StocksTable;
