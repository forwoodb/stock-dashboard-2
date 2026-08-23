"use client";
import Link from "next/link";
import { useState } from "react";

const StocksTable = ({ stocks, deleteStock }) => {
  // const defaultSort = stocks.sort((a, b) => {
  //   return a.ticker.localeCompare(b.ticker);
  // });

  // const [sortedStocks, setSortedStocks] = useState(defaultSort);
  const [sortedStocks, setSortedStocks] = useState(stocks);
  const [sortOrder, setSortOrder] = useState({ key: "ticker", order: "asc" });

  const sortTable = async (key) => {
    const sorted = stocks
      .sort((a, b) => {
        if (sortOrder.order === null) {
          setSortOrder({ key, order: "asc" });
          return a[key].localeCompare(b[key]);
        }
        if (sortOrder.order === "asc") {
          setSortOrder({ key, order: "desc" });
          return b[key].localeCompare(a[key]);
        }
        if (sortOrder.order === "desc") {
          setSortOrder({ key, order: null });
          return stocks;
        }
      })
      .map((stock) => {
        return stock;
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
              <td>{stock.userId}</td>
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
