import { auth } from "@/app/lib/auth";
import { connectDb } from "@/app/lib/mongodb";
import { Trade } from "@/app/lib/types";
import Transaction from "@/app/models/Transaction";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

const TradesPage = async () => {
  await connectDb();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/login");
  }

  console.log(new Date());

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
          <th>Date</th>
          <th>Time</th>
          <th>Day</th>
          <th>Ticker</th>
          <th>Type</th>
          <th>Price</th>
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
              <td>{new Date(trade.createdAt).toLocaleDateString()}</td>
              <td>{new Date(trade.createdAt).toLocaleTimeString()}</td>
              <td>
                {new Date(trade.createdAt).toLocaleDateString("en-US", {
                  weekday: "short",
                })}
              </td>
              <td>{trade.ticker}</td>
              <td>{trade.type}</td>
              <td>${trade.price.toFixed(2)}</td>
              <td>${trade.dollarAmount.toFixed(2)}</td>
              <td>${trade.fiveDayAvg.toFixed(2)}</td>
              <td>${trade.tenDayAvg.toFixed(2)}</td>
              <td>${trade.twentyDayAvg.toFixed(2)}</td>
              <td>${trade.fiftyDayAvg.toFixed(2)}</td>
              <td>${trade.oneHundredDayAvg.toFixed(2)}</td>
              <td>${trade.twoHundredDayAvg.toFixed(2)}</td>
              <td>
                <Link href={`/dashboard/trades/${trade._id}`} className="btn">
                  Edit
                </Link>
              </td>
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
