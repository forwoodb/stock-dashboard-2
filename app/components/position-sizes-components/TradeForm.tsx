"use client";
import { StockInfoType } from "@/app/lib/types";
import { tradeAction } from "@/app/lib/actions";
import { useTransition } from "react";

interface TradeFormPropTypes {
  userId: string;
  transaction: StockInfoType;
  closeForm: () => void;
}

const TradeForm = ({ userId, transaction, closeForm }: TradeFormPropTypes) => {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      await tradeAction(userId, formData);
      closeForm();
    });
  };
  return (
    <div className="sticky top-0 bg-white z-10">
      {/* Bind data to server action? */}
      <form action={handleSubmit} className="flex justify-between items-center">
        {/* <form onSubmit={handleSubmit}> */}
        <label className="floating-label">
          <span>Ticker</span>
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
            <option value={"Sell"}>Sell</option>
            <option value={"Buy"}>Buy</option>
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
        <input
          type="hidden"
          name="fiveDayAvg"
          defaultValue={transaction["5D"]}
        />
        <input
          type="hidden"
          name="tenDayAvg"
          defaultValue={transaction["10D"]}
        />
        <input
          type="hidden"
          name="twentyDayAvg"
          defaultValue={transaction["20D"]}
        />
        <input
          type="hidden"
          name="fiftyDayAvg"
          defaultValue={transaction["50D"]}
        />
        <input
          type="hidden"
          name="oneHundredDayAvg"
          defaultValue={transaction["100D"]}
        />
        <input
          type="hidden"
          name="twoHundredDayAvg"
          defaultValue={transaction["200D"]}
        />
        <button className="btn">{isPending ? "Trading..." : "Trade"}</button>
        <p onClick={closeForm} className="cursor-pointer">
          X Close
        </p>
      </form>
    </div>
  );
};

export default TradeForm;
