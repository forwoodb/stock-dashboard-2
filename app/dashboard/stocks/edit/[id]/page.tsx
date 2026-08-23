import StockForm from "@/app/components/StockForm";
import { auth } from "@/app/lib/auth";
import { connectDb } from "@/app/lib/mongodb";
import Stock from "@/app/models/Stock";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

const EditStockPage = async ({ params }: PageProps) => {
  // Get id from url params
  const { id } = await params;

  // Get session info
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userId = session?.user.id;

  // Get stock to edit
  const data = await Stock.findOne({ _id: id, userId }).lean();
  const stock = JSON.parse(JSON.stringify(data));

  const updateStockAction = async (formData: FormData) => {
    "use server";
    await connectDb();

    const ticker = formData.get("ticker");
    const company = formData.get("company");

    await Stock.findOneAndUpdate({ _id: id, userId }, { ticker, company });

    redirect("/dashboard/stocks");
  };
  return (
    <div>
      <h1>Edit Stock</h1>
      <StockForm
        mode="edit"
        formAction={updateStockAction}
        ticker={stock.ticker}
        company={stock.company}
      />
    </div>
  );
};

export default EditStockPage;
