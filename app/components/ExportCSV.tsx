"use client";

import { Trade } from "../lib/types";

interface ExportCSVProps {
  trades: Trade[];
}

const ExportCSV = ({ trades }: ExportCSVProps) => {
  const createCSV = (data: Trade[], filename = "trades.csv") => {
    // Create Headers
    const headers = Object.keys(data[0]);

    // Build CSV rows
    const csv = [
      headers.join(","),
      ...data.map((row) =>
        headers.map((header) => row[header as keyof typeof row]).join(","),
      ),
    ].join("\n");

    //
    const blob = new Blob([csv], { type: "text/csv; charset=utf-8" });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();

    URL.revokeObjectURL(url);
  };

  // createCSV(trades);

  return (
    <div>
      <button onClick={() => createCSV(trades)} className="btn">
        Export Trades to CSV
      </button>
    </div>
  );
};

export default ExportCSV;
