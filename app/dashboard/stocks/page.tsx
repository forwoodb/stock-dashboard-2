import { connectDb } from "@/app/lib/mongodb";
import Stock from "@/app/models/Stock";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/app/lib/auth";
import StocksTable from "@/app/components/StocksTable";
import { revalidatePath } from "next/cache";
import StockForm from "@/app/components/StockForm";
import { StockType } from "@/app/lib/types";

const StocksPage = async () => {
  await connectDb();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/login");
  }

  // Get user
  const userId = session.user.id;

  // Get stocks
  const data = await Stock.find({ userId }).lean();
  const stocks: StockType[] = JSON.parse(JSON.stringify(data));

  const createStockAction = async (formData: FormData) => {
    "use server";
    await connectDb();

    const ticker = String(formData.get("ticker")).toUpperCase();
    const company = formData.get("company");

    const stock = await new Stock({ ticker, company, userId });
    console.log(ticker);

    await stock.save();

    revalidatePath("/dashboard/stocks");
  };

  const deleteStockAction = async (formData: FormData) => {
    "use server";
    await connectDb();

    const id = formData.get("id");

    await Stock.findOneAndDelete({ _id: id, userId });

    revalidatePath("/dashboard/stocks");
  };

  return (
    <main>
      <div className="page-container w-[95%] mx-auto">
        <h1>Stocks Page</h1>
        <StockForm
          mode="create"
          formAction={createStockAction}
          ticker=""
          company=""
        />
        <StocksTable stocks={stocks} deleteStock={deleteStockAction} />
      </div>
    </main>
  );
};

export default StocksPage;
