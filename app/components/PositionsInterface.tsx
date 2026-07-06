"use client";
import { useEffect, useState } from "react";
import AccountBalanceForm from "./AccountBalanceForm";
import AccountPositions from "./AccountPositions";
import StopLossForm from "./StopLossForm";

const PositionsInterface = ({ stocks }) => {
  const [accountBalance, setAccountBalance] = useState("");
  const [updateAccountBalance, setUpdateAccountBalance] = useState("");
  const [stopLoss, setStopLoss] = useState("");
  const [updateStopLoss, setUpdateStopLoss] = useState("");

  useEffect(() => {
    const fetchLocalStorage = () => {
      const accBal = localStorage.getItem("accountBalance");
      setAccountBalance(accBal);

      const stop = localStorage.getItem("stopLoss");
      setStopLoss(stop);
    };

    fetchLocalStorage();
  });

  // Account Balance
  const updateAccBal = (e) => {
    e.preventDefault();
    localStorage.setItem("accountBalance", updateAccountBalance);
    setAccountBalance(updateAccountBalance);
    setUpdateAccountBalance("");
  };

  const handleAccBalChange = (e) => {
    return setUpdateAccountBalance(e.target.value);
  };

  // Stop Loss

  return (
    <>
      <div className="info-container flex justify-between">
        <div className="forms-wrapper flex flex-col justify-between w-[50%]">
          <AccountBalanceForm
            value={updateAccountBalance}
            change={handleAccBalChange}
            submit={updateAccBal}
          />
          <StopLossForm value={updateStopLoss} />
        </div>
        <AccountPositions stocks={stocks} accBal={accountBalance} />
      </div>
    </>
  );
};

export default PositionsInterface;
