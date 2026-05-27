import StockForm from "@/app/components/StockForm";
import { connectDb } from "@/app/lib/mongodb";

const EditStockPage = () => {
  const updateStockAction = async (formData: FormData) => {
    "use server";
    await connectDb();

    console.log(formData);
  };
  return (
    <div>
      <h1>Edit Stock</h1>
      <StockForm formAction={updateStockAction} />
    </div>
  );
};

export default EditStockPage;
