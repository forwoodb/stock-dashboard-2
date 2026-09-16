"use client";

import { Trade } from "../lib/types";

interface ExportCSVProps {
  trades: Trade[];
}

const ExportCSV = ({ trades }: ExportCSVProps) => {
  console.log(trades);

  return (
    <div>
      <button className="btn">Export Trades to CSV</button>
    </div>
  );
};

export default ExportCSV;
