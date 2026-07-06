"use client";
import { useEffect, useState } from "react";
import AccountBalanceForm from "./AccountBalanceForm";
import AccountPositions from "./AccountPositions";
import StopLossForm from "./StopLossForm";

const PositionsInterface = ({ stocks }) => {
  const [accountBalance, setAccountBalance] = useState("");

  useEffect(() => {
    const accBal = localStorage.getItem("accountBalance");
    setAccountBalance(accBal);
    console.log(accountBalance);
  });

  const updateAccBal = (e) => {
    e.preventDefault();
    localStorage.setItem("accBal", accBal);
    console.log(accBal);
  };

  const handleAccBalChange = (e) => {
    setAccountBalance(e.target.value);
  };
  return (
    <>
      <div className="info-container flex justify-between">
        <div className="forms-wrapper flex flex-col justify-between w-[50%]">
          <AccountBalanceForm
            accBal={accountBalance}
            submit={updateAccBal}
            change={handleAccBalChange}
          />
          <StopLossForm />
        </div>
        <AccountPositions stocks={stocks} accBal={accountBalance} />
      </div>
    </>
  );
};

export default PositionsInterface;
