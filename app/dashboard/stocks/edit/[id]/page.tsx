import StockForm from "@/app/components/StockForm";
import { connectDb } from "@/app/lib/mongodb";
import Stock from "@/app/models/Stock";

interface PageProps {
  params: Promise<{ id: string }>;
}

const EditStockPage = async ({ params }: PageProps) => {
  // Get id from url params
  const { id } = await params;

  // Get stock to edit
  const data = await Stock.findOne({ _id: id }).lean();
  const stock = JSON.parse(JSON.stringify(data));

  const updateStockAction = async (formData: FormData) => {
    "use server";
    await connectDb();

    console.log(formData);
  };
  return (
    <div>
      <h1>Edit Stock</h1>
      <StockForm
        formAction={updateStockAction}
        ticker={stock.ticker}
        company={stock.company}
      />
    </div>
  );
};

export default EditStockPage;
