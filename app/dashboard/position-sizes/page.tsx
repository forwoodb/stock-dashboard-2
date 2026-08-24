import { connectDb } from "@/app/lib/mongodb";
import Stock from "@/app/models/Stock";
import { revalidatePath } from "next/cache";
import { mergeCSVData } from "@/app/lib/functions";
import { StockInfoType, StockType } from "@/app/lib/types";
import PositionSizesClient from "@/app/components/position-sizes-components/PositionSizesClient";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { User } from "@/app/models/User";
import AccountBalanceForm from "@/app/components/position-sizes-components/AccountBalanceForm";
import StopLossForm from "@/app/components/position-sizes-components/StopLossForm";
import AccountPositions from "@/app/components/position-sizes-components/AccountPositions";
import { execFile } from "child_process";

const PositionsPage = async () => {
  await connectDb();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/login");
  }

  // Get user data
  const userId = session.user.id;
  const userData = await User.findOne({ _id: userId }).lean();
  const user = JSON.parse(JSON.stringify(userData));

  const balance = user.accountBalance;

  const stop = user.stopLoss;

  const data = await Stock.find({ userId, position: true }).lean();
  const stocks: StockType[] = JSON.parse(JSON.stringify(data));

  const runPython = async () => {
    "use server";
    execFile("python3", ["yahoo.py"]);
  };

  const merge = mergeCSVData(stocks) as StockInfoType[];

  const toWatchList = async (formData: FormData) => {
    "use server";
    const id = formData.get("id");

    await Stock.findByIdAndUpdate(id, {
      userId,
      positionSize: 0,
      averageCost: 0,
      watchList: true,
      position: false,
    });
    revalidatePath("/dashboard/position-sizes");
  };

  // // FastAPI route
  // const getStocks = async () => {
  //   "use server";
  //   const res = await fetch(`/api/stock-data`);
  //   const data = await res.json();
  //   console.log(data);
  // };

  return (
    <main>
      <div className="container-main w-[95%] m-auto">
        <h1>Position Sizes Page</h1>
        <div className="info-container flex justify-between">
          <div className="forms-wrapper flex flex-col justify-between w-[50%]">
            <AccountBalanceForm user={user} />
            <StopLossForm user={user} />
          </div>
          <AccountPositions
            stocks={stocks}
            accBal={balance}
            stopLoss={stop}
            runPython={runPython}
          />
        </div>
        <PositionSizesClient
          userId={userId}
          data={merge}
          serverAction={toWatchList}
          accBal={balance}
          stopLoss={stop}
        />
      </div>
    </main>
  );
};

export default PositionsPage;
