import { auth } from "@/app/lib/auth";
import { connectDb } from "@/app/lib/mongodb";
import Transaction from "@/app/models/Transaction";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

const EditTradePage = async ({ params }: PageProps) => {
  const { id } = await params;

  const data = await Transaction.findOne({ _id: id }).lean();
  const trade = JSON.parse(JSON.stringify(data));

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userId = session?.user.id;

  const updateTrade = async (formData: FormData) => {
    "use server";
    await connectDb();

    const updatedData = Object.fromEntries(formData);

    await Transaction.findOneAndUpdate({ _id: id, userId }, updatedData);
    console.log({ updatedData });

    redirect("/dashboard/trades");
  };

  return (
    <main>
      <h1>Edit Trade</h1>
      <form action={updateTrade}>
        <label className="floating-label">
          <span>Ticker</span>
          <input
            type="text"
            name="ticker"
            placeholder="Ticker"
            defaultValue={trade.ticker}
            className="input input-md"
          />
        </label>
        <label className="floating-label">
          <span>Type</span>
          <label className="select">
            <span className="label">Type</span>
            <select name="type" defaultValue={trade.type}>
              <option value={"Sell"}>Sell</option>
              <option value={"Buy"}>Buy</option>
            </select>
          </label>
        </label>
        <label className="floating-label">
          <span>Price</span>
          <input
            type="text"
            name="price"
            placeholder="Price"
            defaultValue={trade.price}
            className="input input-md"
          />
        </label>

        <label className="floating-label">
          <span>Dollar Amount</span>
          <input
            type="text"
            name="dollarAmount"
            placeholder="Dollar Amount"
            defaultValue={trade.dollarAmount}
            className="input input-md"
          />
        </label>
        <label className="floating-label">
          <span>5D</span>
          <input
            type="text"
            name="fiveDayAvg"
            placeholder="5D"
            defaultValue={trade.fiveDayAvg}
            className="input input-md"
          />
        </label>
        <label className="floating-label">
          <span>10D</span>
          <input
            type="text"
            name="tenDayAvg"
            placeholder="10D"
            defaultValue={trade.tenDayAvg}
            className="input input-md"
          />
        </label>
        <label className="floating-label">
          <span>20D</span>
          <input
            type="text"
            name="twentyDayAvg"
            placeholder="20D"
            defaultValue={trade.twentyDayAvg}
            className="input input-md"
          />
        </label>
        <label className="floating-label">
          <span>50D</span>
          <input
            type="text"
            name="fiftyDayAvg"
            placeholder="50D"
            defaultValue={trade.fiftyDayAvg}
            className="input input-md"
          />
        </label>
        <label className="floating-label">
          <span>100D</span>
          <input
            type="text"
            name="oneHundredDayAvg"
            placeholder="100D"
            defaultValue={trade.oneHundredDayAvg}
            className="input input-md"
          />
        </label>
        <label className="floating-label">
          <span>200D</span>
          <input
            type="text"
            name="twoHundredDayAvg"
            placeholder="200D"
            defaultValue={trade.twoHundredDayAvg}
            className="input input-md"
          />
        </label>
        <button className="btn">Save</button>
      </form>
    </main>
  );
};

export default EditTradePage;
