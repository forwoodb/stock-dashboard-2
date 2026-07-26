import { StockInfoType } from "@/app/lib/types";

interface TradeFormPropTypes {
  transaction: StockInfoType;
}

const TradeForm = ({ transaction }: TradeFormPropTypes) => {
  return (
    <div>
      <form action="">
        <select name="trade" id="trade">
          <option value="buy">Buy</option>
          <option value="sell">Sell</option>
        </select>
        <input type="text" />
        <button className="btn">Trade</button>
      </form>
    </div>
  );
};

export default TradeForm;
