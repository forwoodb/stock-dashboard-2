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
        <select name="trade" id="trade">
          <option value="buy">Buy</option>
          <option value="sell">Sell</option>
        </select>
        <input type="text" defaultValue={transaction.Close} />
        <button className="btn">Trade</button>
      </form>
    </div>
  );
};

export default TradeForm;
