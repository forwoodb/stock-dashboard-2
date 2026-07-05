"use client";
import { useState } from "react";
import AccountBalanceForm from "./AccountBalanceForm";

const PositionsInterface = () => {
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
      <AccountBalanceForm
        submit={updateAccBal}
        accBal={accBal}
        change={handleAccBalChange}
      />
    </>
  );
};

export default PositionsInterface;
