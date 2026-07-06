import { connectDb } from "@/app/lib/mongodb";
import Stock from "@/app/models/Stock";
import { revalidatePath } from "next/cache";
import { mergeCSVData } from "@/app/lib/functions";
import { StockInfoType, StockType } from "@/app/lib/types";
import PositionSizesTable from "@/app/components/PositionSizesTable";
import PositionsInterface from "@/app/components/PositionsInterface";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { User } from "@/app/models/User";
import AccountBalanceForm from "@/app/components/AccountBalanceForm";
import StopLossForm from "@/app/components/StopLossForm";
import AccountPositions from "@/app/components/AccountPositions";

const PositionsPage = async () => {
  await connectDb();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/login");
  }

  const userId = session.user.id;

  const user = await User.findOne({ _id: userId });

  const balance = user.accountBalance;

  if (!balance) {
    await User.findByIdAndUpdate(userId, { accountBalance: 0 });
  }

  console.log(balance);

  const data = await Stock.find({ position: true }).lean();
  const stocks: StockType[] = JSON.parse(JSON.stringify(data));

  const merge = mergeCSVData(stocks) as StockInfoType[];

  const toWatchList = async (formData: FormData) => {
    "use server";
    const id = formData.get("id");

    await Stock.findByIdAndUpdate(id, {
      positionSize: 0,
      averageCost: 0,
      watchList: true,
      position: false,
    });
    revalidatePath("/dashboard/position-sizes");
  };

  return (
    <main>
      <div className="container-main w-[95%] m-auto">
        <h1>Position Sizes Page</h1>
        <div className="info-container flex justify-between">
          <div className="forms-wrapper flex flex-col justify-between w-[50%]">
            <AccountBalanceForm />
            <StopLossForm value={updateStopLoss} />
          </div>
          <AccountPositions stocks={stocks} accBal={balance} />
        </div>
        <PositionSizesTable data={merge} serverAction={toWatchList} />
      </div>
    </main>
  );
};

export default PositionsPage;
