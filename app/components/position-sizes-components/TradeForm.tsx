"use client";
import { StockInfoType } from "@/app/lib/types";
import { tradeAction } from "@/app/lib/actions";

interface TradeFormPropTypes {
  transaction: StockInfoType;
}

const TradeForm = ({ transaction }: TradeFormPropTypes) => {
  return (
    <div>
      <form action={tradeAction}>
        <label className="select">
          <span className="label">Type</span>
          <select name="trade">
            <option>Buy</option>
            <option>Sell</option>
          </select>
        </label>
        <label className="floating-label">
          <span>Price</span>
          <input
            type="text"
            name="price"
            placeholder="Price"
            defaultValue={transaction.Close}
            className="input input-md"
          />
        </label>
        <button className="btn">Trade</button>
      </form>
    </div>
  );
};

export default TradeForm;
