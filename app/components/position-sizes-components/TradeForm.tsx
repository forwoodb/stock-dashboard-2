import { connectDb } from "@/app/lib/mongodb";
import { StockInfoType, Transaction } from "@/app/lib/types";

interface TradeFormPropTypes {
  transaction: StockInfoType;
}

const TradeForm = ({ transaction }: TradeFormPropTypes) => {
  const tradeAction = async (formData: FormData) => {
    "use server";
    await connectDb();

    console.log(formData);
  };
  return (
    <div>
      <form action={tradeAction}>
        <select name="trade" id="trade">
          <option value="buy">Buy</option>
          <option value="sell">Sell</option>
        </select>
        <input type="text" value={transaction.Close} />
        <button className="btn">Trade</button>
      </form>
    </div>
  );
};

export default TradeForm;
