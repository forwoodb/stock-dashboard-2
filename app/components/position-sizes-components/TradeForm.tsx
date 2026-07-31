"use client";
import { StockInfoType } from "@/app/lib/types";
import { tradeAction } from "@/app/lib/actions";

interface TradeFormPropTypes {
  transaction: StockInfoType;
}

const TradeForm = ({ transaction }: TradeFormPropTypes) => {
  return (
    <div>
      {/* Bind data to server action? */}
      <form action={tradeAction}>
        {/* <form onSubmit={handleSubmit}> */}
        <label className="floating-label">
          <span>Price</span>
          <input
            type="text"
            name="ticker"
            defaultValue={transaction.ticker}
            placeholder="Ticker"
            className="input input-md"
          />
        </label>
        <label className="select">
          <span className="label">Type</span>
          <select name="type">
            <option>Buy</option>
            <option>Sell</option>
          </select>
        </label>
        <label className="floating-label">
          <span>Price</span>
          <input
            type="text"
            name="price"
            defaultValue={transaction.Close}
            placeholder="Price"
            className="input input-md"
          />
        </label>
        <label className="floating-label">
          <span>Dollar Amount</span>
          <input
            type="text"
            name="dollarAmount"
            placeholder="Dollar Amount"
            className="input input-md"
          />
        </label>
        <input type="text" name="fiveDayAvg" defaultValue={transaction["5D"]} />
        <input type="text" name="tenDayAvg" defaultValue={transaction["10D"]} />
        <input
          type="text"
          name="twentyDayAvg"
          defaultValue={transaction["20D"]}
        />
        <input
          type="text"
          name="fiftyDayAvg"
          defaultValue={transaction["50D"]}
        />
        <input
          type="text"
          name="oneHundredDayAvg"
          defaultValue={transaction["100D"]}
        />
        <input
          type="text"
          name="twoHundredDayAvg"
          defaultValue={transaction["200D"]}
        />
        <button className="btn">Trade</button>
      </form>
    </div>
  );
};

export default TradeForm;
