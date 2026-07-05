import { connectDb } from "@/app/lib/mongodb";
import Stock from "@/app/models/Stock";
import { revalidatePath } from "next/cache";
import { mergeCSVData } from "@/app/lib/functions";
import { StockInfoType, StockType } from "@/app/lib/types";
import StopLossForm from "@/app/components/StopLossForm";
import PositionSizesTable from "@/app/components/PositionSizesTable";
import AccountPositions from "@/app/components/AccountPositions";
import PositionsInterface from "@/app/components/PositionsInterface";

const PositionsPage = async () => {
  await connectDb();

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
            <PositionsInterface />
            <StopLossForm />
          </div>
          <AccountPositions stocks={stocks} />
        </div>
        <PositionSizesTable data={merge} serverAction={toWatchList} />
      </div>
    </main>
  );
};

export default PositionsPage;
