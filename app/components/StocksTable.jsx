const StocksTable = ({ stocks }) => {
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
                <button className="btn">Edit</button>
              </td>
              <td>
                <button className="btn">Delete</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default StocksTable;
