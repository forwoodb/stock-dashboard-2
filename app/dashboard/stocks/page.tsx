import { connectDb } from "@/app/lib/mongodb";
import Stock from "@/app/models/Stock";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/app/lib/auth";
import StocksTable from "@/app/components/StocksTable";

interface Stock {
  _id: string;
  ticker: string;
  company: string;
  positionSize: number;
  averageCost: number;
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
    <main>
      <div className="page-container w-[95%] mx-auto">
        <h1>Stocks Page</h1>
        <form action=""></form>
        <StocksTable stocks={stocks} />
      </div>
    </main>
  );
};

export default StocksPage;
