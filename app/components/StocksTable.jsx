import Link from "next/link";

const StocksTable = ({ stocks, deleteStock }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Ticker</th>
          <th>Company</th>
        </tr>
      </thead>
      <tbody>
        {stocks.map((stock) => {
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
