"use client";
import { useEffect, useState } from "react";
import AccountBalanceForm from "./AccountBalanceForm";
import AccountPositions from "./AccountPositions";
import StopLossForm from "./StopLossForm";

const PositionsInterface = ({ stocks }) => {
  const [accountBalance, setAccountBalance] = useState("");
  const [updateAccountBalance, setUpdateAccountBalance] = useState("");

  useEffect(() => {
    const fetchLocalStorage = () => {
      const accBal = localStorage.getItem("accountBalance");
      setAccountBalance(accBal);
      console.log(accountBalance);
    };

    fetchLocalStorage();
  });

  const updateAccBal = (e) => {
    e.preventDefault();
    localStorage.setItem("accountBalance", updateAccountBalance);
    setAccountBalance(updateAccountBalance);
    setUpdateAccountBalance("");
  };

  const handleAccBalChange = (e) => {
    return setUpdateAccountBalance(e.target.value);
  };
  return (
    <>
      <div className="info-container flex justify-between">
        <div className="forms-wrapper flex flex-col justify-between w-[50%]">
          <AccountBalanceForm
            value={updateAccountBalance}
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
