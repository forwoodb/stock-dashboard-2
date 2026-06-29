import { connectDb } from "@/app/lib/mongodb";
import { StockType } from "@/app/lib/types";
import Stock from "@/app/models/Stock";

import { revalidatePath } from "next/cache";
import WatchListTable from "@/app/components/WatchListTable";
import { mergeCSVData } from "@/app/lib/functions";

const WatchlistPage = async () => {
  await connectDb();

  const data = await Stock.find({ watchList: true }).lean();
  const stocks: StockType[] = JSON.parse(JSON.stringify(data));

  const merge = mergeCSVData(stocks);

  const toPosition = async (formData: FormData) => {
    "use server";
    await connectDb();

    const id = formData.get("id");

    await Stock.findByIdAndUpdate(id, {
      watchList: false,
      position: true,
    });

    revalidatePath("/dashboard/watch-list");
  };

  return (
    <div>
      <h1>Watch List Page</h1>
      <WatchListTable mode="watchList" data={merge} formAction={toPosition} />
    </div>
  );
};

export default WatchlistPage;
