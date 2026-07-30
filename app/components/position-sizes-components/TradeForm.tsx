"use client";
import { StockInfoType } from "@/app/lib/types";
// import { tradeAction } from "@/app/lib/actions";
import { SubmitEvent } from "react";

interface TradeFormPropTypes {
  transaction: StockInfoType;
  handleSubmit: (e: SubmitEvent<HTMLFormElement>) => Promise<void>;
}

const TradeForm = ({ transaction, handleSubmit }: TradeFormPropTypes) => {
  return (
    <div>
      {/* <form action={tradeAction}> */}
      <form onSubmit={handleSubmit}>
        <label className="floating-label">
          <span>Price</span>
          <input
            type="text"
            name="ticker"
            placeholder="Ticker"
            defaultValue={transaction.ticker}
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
            placeholder="Price"
            defaultValue={transaction.Close}
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
        <button className="btn">Trade</button>
      </form>
    </div>
  );
};

export default TradeForm;
