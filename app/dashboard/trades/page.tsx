import { connectDb } from "@/app/lib/mongodb";
import { Trade } from "@/app/lib/types";
import Transaction from "@/app/models/Transaction";

const TradesPage = async () => {
  await connectDb();

  const data = await Transaction.find({}).lean();
  const trades = JSON.parse(JSON.stringify(data)) as Trade[];

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Ticker</th>
          <th>Type</th>
          <th>Pos Size</th>
          <th>5D</th>
        </tr>
      </thead>
      <tbody>
        {trades.map((trade) => {
          return (
            <tr key={trade._id}>
              <td>{trade.ticker}</td>
              <td>{trade.type}</td>
              <td>{trade.positionSize}</td>
              <td>{trade.fiveDayAvg}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TradesPage;
