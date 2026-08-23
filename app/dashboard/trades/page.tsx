import { auth } from "@/app/lib/auth";
import { connectDb } from "@/app/lib/mongodb";
import { Trade } from "@/app/lib/types";
import Transaction from "@/app/models/Transaction";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const TradesPage = async () => {
  await connectDb();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/login");
  }

  const userId = session.user.id;

  const data = await Transaction.find({ userId }).lean();
  const trades = JSON.parse(JSON.stringify(data)) as Trade[];

  const deleteTradeAction = async (id: string) => {
    "use server";
    await connectDb();

    await Transaction.findOneAndDelete({ _id: id, userId });

    revalidatePath("/dashboard/trades");
  };

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
              <td>
                <form action={deleteTradeAction.bind(null, trade._id)}>
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

export default TradesPage;
