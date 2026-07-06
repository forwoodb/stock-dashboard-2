"use client";
import { StockType } from "../lib/types";

// interface AccountPositionsProps {
//   stocks: StockType[];
// }

// const AccountPositions = ({ stocks, accBal }: AccountPositionsProps) => {
const AccountPositions = ({ stocks, accBal }) => {
  // const accBal = localStorage.getItem("accBal");
  // setAccountBalance(accBal);

  const stopLoss = localStorage.getItem("stopLoss");
  // setStopLoss(stopLoss);

  const numPos = stocks.length;
  const avgAmt = Number(accBal) / Number(stocks.length);
  const avgPos = avgAmt.toFixed(2);
  const maxAmt = Number(stopLoss) * Number(avgPos);
  const maxPos = maxAmt.toFixed(2);
  // const stopLossDecimal = stopLoss / 100;

  const runPython = () => {
    fetch("/api/dashboard/run-python");
  };

  return (
    <div className="mb-3 w-[75%]">
      <div className="flex flex-col justify-between h-full p-4 rounded bg-white border border-gray-300">
        <p className="card-text">
          Account Balance: $<span id="account-balance">{accBal}</span>
        </p>
        <p className="card-text">
          Number of Positions: <span id="num-pos">{numPos}</span>
        </p>
        <p className="card-text">
          Average Position Size: $<span id="avg-pos-size">{avgPos}</span>
        </p>
        <p className="card-text">
          Stop-Loss: <span id="stop-loss">{stopLoss}</span>%
        </p>
        <p className="card-text">
          Maximum Position Size: $<span id="max-pos-size">{maxPos}</span>
        </p>
        {/* <button onClick={runPython} className="bg-green-700 text-white"> */}
        <button onClick={runPython} className="btn">
          Update Prices
        </button>
      </div>
    </div>
  );
};

export default AccountPositions;
