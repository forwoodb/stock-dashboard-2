"use client";
import { useState } from "react";
import PositionSizesTable from "./PositionSizesTable";
import { TableProps, MAKey, StockInfoType } from "../../lib/types";
import TradeForm from "./TradeForm";
import { SubmitEvent } from "react";

const PositionSizesClient = ({
  data,
  serverAction,
  accBal,
  stopLoss,
}: TableProps) => {
  const [trade, setTrade] = useState(false);
  const [transaction, setTransaction] = useState<StockInfoType | null>(null);

  const handleTrade = (stock: StockInfoType) => {
    setTrade(!trade);
    const transaction = {
      _id: stock._id,
      ticker: stock.ticker,
      Time: stock.Time,
      Close: stock.Close,
      "5D": stock["5D"],
      "10D": stock["10D"],
      "20D": stock["20D"],
      "50D": stock["50D"],
      "100D": stock["100D"],
      "200D": stock["200D"],
      averageCost: stock.averageCost,
      positionSize: stock.positionSize,
      // type: stock.type,
      // ticker: stock.ticker,
      // time: stock.Time,
      // Close: stock.Close,
      // fiveDayAvg: stock["5D"],
      // tenDayAvg: stock["10D"],
      // twentyDayAvg: stock["20D"],
      // fiftyDayAvg: stock["50D"],
      // oneHundredDayAvg: stock["100D"],
      // twoHundredDayAvg: stock["200D"],
    };
    setTransaction(transaction);
    console.log(transaction);
  };

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("click");
  };

  return (
    <div>
      {trade && transaction && (
        <TradeForm transaction={transaction} handleSubmit={handleSubmit} />
      )}
      <PositionSizesTable
        data={data}
        serverAction={serverAction}
        accBal={accBal}
        stopLoss={stopLoss}
        handleTrade={handleTrade}
      />
    </div>
  );
};

export default PositionSizesClient;
