"use client";
import { useState } from "react";
import PositionSizesTable from "./PositionSizesTable";
import { TableProps, MAKey, StockInfoType } from "../../lib/types";

// interface StockTrade {

// }

const PositionSizesClient = ({
  data,
  serverAction,
  accBal,
  stopLoss,
}: TableProps) => {
  // const [trade, setTrade] = useState(false);

  const handleTrade = (stock: StockInfoType) => {
    const transaction = {
      price: stock.Close,
      // type: "buy" || stock.type,
      fiveDayAvg: stock["5D"],
      tenDayAvg: stock["10D"],
      twentyDayAvg: stock["20D"],
      fiftyDayAvg: stock["50D"],
      oneHundredDayAvg: stock["100D"],
      twoHundredDayAvg: stock["200D"],
    };
    console.log(transaction);
  };

  return (
    <div>
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
