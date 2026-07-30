"use client";
import { StockInfoType } from "@/app/lib/types";
import { tradeAction } from "@/app/lib/actions";
// import { SubmitEvent } from "react";

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
            defaultValue={transaction.Close}
            placeholder="Price"
            className="input input-md"
          />
        </label>
        <label className="floating-label">
          <span>Position Size</span>
          <input
            type="text"
            name="position-size"
            placeholder="Position Size"
            className="input input-md"
          />
        </label>
        <label className="floating-label">
          <span>5 Day</span>
          <input
            type="text"
            name="five-day"
            defaultValue={transaction["5D"]}
            placeholder="Position Size"
            className="input input-md"
          />
        </label>
        <input type="text" name="ten-day" defaultValue={transaction["10D"]} />
        <input
          type="text"
          name="twenty-day"
          defaultValue={transaction["10D"]}
        />
        <input type="text" name="fifty-day" defaultValue={transaction["10D"]} />
        <input
          type="text"
          name="one-hundred-day"
          defaultValue={transaction["10D"]}
        />
        <input
          type="text"
          name="two-hundred-day"
          defaultValue={transaction["10D"]}
        />
        <button className="btn">Trade</button>
      </form>
    </div>
  );
};

export default TradeForm;
