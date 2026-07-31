import { connectDb } from "@/app/lib/mongodb";
import Transaction from "@/app/models/Transaction";

const TradesPage = async () => {
  await connectDb();

  const trades = await Transaction.find({});

  return (
    <table className="table">
      <thead></thead>
      <tbody>
        {trades.map((trade) => {
          return (
            <tr key={trade._id}>
              <td>{trade.ticker}</td>
              <td>{trade.type}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TradesPage;
