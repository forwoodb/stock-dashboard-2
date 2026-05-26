import { connectDb } from "@/app/lib/mongodb";
import Stock from "@/app/models/Stock";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/app/lib/auth";

const StocksPage = async () => {
  await connectDb();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/login");
  }

  const data = await Stock.find({}).lean();
  const stocks = JSON.parse(JSON.stringify(data));

  console.log(stocks);

  return (
    <div>
      <h1>Stocks Page</h1>
    </div>
  );
};

export default StocksPage;
