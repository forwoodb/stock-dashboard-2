import { connectDb } from "@/app/lib/mongodb";
import Stock from "@/app/models/Stock";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/app/lib/auth";

interface Stock {
  _id: string;
  ticker: string;
}

const StocksPage = async () => {
  await connectDb();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/login");
  }

  const data = await Stock.find({}).lean();
  const stocks: Stock[] = JSON.parse(JSON.stringify(data));

  return (
    <div>
      <h1>Stocks Page</h1>
      <table>
        <thead>
          <tr>
            <th>Ticker</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => {
            return (
              <tr key={stock._id}>
                <td>{stock.ticker}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StocksPage;
