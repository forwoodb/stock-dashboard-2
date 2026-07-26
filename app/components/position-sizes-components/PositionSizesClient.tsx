import React from "react";
import PositionSizesTable from "./PositionSizesTable";
import { TableProps, MAKey, StockInfoType } from "../../lib/types";

const PositionSizesClient = ({
  data,
  serverAction,
  accBal,
  stopLoss,
}: TableProps) => {
  return (
    <div>
      <PositionSizesTable
        data={data}
        serverAction={serverAction}
        accBal={accBal}
        stopLoss={stopLoss}
      />
    </div>
  );
};

export default PositionSizesClient;
