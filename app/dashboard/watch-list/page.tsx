import { connectDb } from "@/app/lib/mongodb";
import { StockInfoType, StockType } from "@/app/lib/types";
import Stock from "@/app/models/Stock";

import { revalidatePath } from "next/cache";
import WatchListTable from "@/app/components/WatchListTable";
import { mergeCSVData } from "@/app/lib/functions";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const WatchlistPage = async () => {
  await connectDb();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/login");
  }

  const data = await Stock.find({ watchList: true }).lean();
  const stocks: StockType[] = JSON.parse(JSON.stringify(data));

  const merge = mergeCSVData(stocks) as StockInfoType[];

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
