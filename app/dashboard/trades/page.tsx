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
          <th>Price</th>
          <th>Pos Size</th>
          <th>$ Amt</th>
          <th>5D</th>
          <th>10D</th>
          <th>20D</th>
          <th>50D</th>
          <th>100D</th>
          <th>200D</th>
        </tr>
      </thead>
      <tbody>
        {trades.map((trade) => {
          return (
            <tr key={trade._id}>
              <td>{trade.ticker}</td>
              <td>{trade.type}</td>
              <td>{trade.price}</td>
              <td>{trade.positionSize}</td>
              <td>{trade.dollarAmount}</td>
              <td>{trade.fiveDayAvg}</td>
              <td>{trade.tenDayAvg}</td>
              <td>{trade.twentyDayAvg}</td>
              <td>{trade.fiftyDayAvg}</td>
              <td>{trade.oneHundredDayAvg}</td>
              <td>{trade.twoHundredDayAvg}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TradesPage;
