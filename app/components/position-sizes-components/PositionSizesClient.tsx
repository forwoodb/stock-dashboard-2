"use client";
import { useState } from "react";
import PositionSizesTable from "./PositionSizesTable";
import { TableProps, MAKey, StockInfoType } from "../../lib/types";
import TradeForm from "./TradeForm";

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
    };
    setTransaction(transaction);
    console.log(transaction);
  };

  return (
    <div>
      {trade && transaction && <TradeForm transaction={transaction} />}
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
