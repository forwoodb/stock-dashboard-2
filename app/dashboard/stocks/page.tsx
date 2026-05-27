import { connectDb } from "@/app/lib/mongodb";
import Stock from "@/app/models/Stock";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/app/lib/auth";
import StocksTable from "@/app/components/StocksTable";
import { revalidatePath } from "next/cache";

interface Stock {
  _id: string;
  ticker: string;
  company: string;
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

  const createStockAction = async (formData: FormData) => {
    "use server";
    await connectDb();

    const ticker = formData.get("ticker");
    const company = formData.get("company");

    const stock = await new Stock({ ticker, company });

    await stock.save();

    revalidatePath("/dashboard/stocks");
  };

  const deleteStockAction = async (formData: FormData) => {
    "use server";
    await connectDb();

    const id = formData.get("id");

    await Stock.findByIdAndDelete(id);

    revalidatePath("/dashboard/stocks");
  };

  return (
    <main>
      <div className="page-container w-[95%] mx-auto">
        <h1>Stocks Page</h1>
        <form
          action={createStockAction}
          className="flex justify-between items-center w-[95%] mx-auto"
        >
          <label htmlFor="ticker">Ticker: </label>
          <input type="text" name="ticker" id="ticker" className="input mr-4" />

          <label htmlFor="company">Company: </label>
          <input
            type="text"
            name="company"
            id="company"
            className="input mr-4"
          />

          <button className="btn">Add Stock</button>
        </form>
        <StocksTable stocks={stocks} deleteStock={deleteStockAction} />
      </div>
    </main>
  );
};

export default StocksPage;
