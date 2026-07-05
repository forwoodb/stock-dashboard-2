"use client";
import { useState } from "react";
import AccountBalanceForm from "./AccountBalanceForm";
import AccountPositions from "./AccountPositions";
import StopLossForm from "./StopLossForm";

const PositionsInterface = ({ stocks }) => {
  const [accBal, setAccBal] = useState("");

  const updateAccBal = (e) => {
    e.preventDefault();
    localStorage.setItem("accBal", accBal);
    console.log(accBal);
  };

  const handleAccBalChange = (e) => {
    setAccBal(e.target.value);
  };
  return (
    <>
      <div className="info-container flex justify-between">
        <div className="forms-wrapper flex flex-col justify-between w-[50%]">
          <AccountBalanceForm />
          <StopLossForm />
        </div>
        <AccountPositions stocks={stocks} />
      </div>
    </>
  );
};

export default PositionsInterface;
