"use client";

import { useState } from "react";
import { Trade } from "../lib/types";

interface DeleteTradeProps {
  deleteTradeAction: (id: string) => Promise<void>;
  trade: Trade;
}
const DeleteTrade = ({ deleteTradeAction, trade }: DeleteTradeProps) => {
  const [del, setDelete] = useState(false);

  return (
    <div>
      <button
        onClick={() => setDelete(true)}
        className={`btn ${del && "hidden"}`}
      >
        Delete
      </button>
      <div className={`${del === false && "hidden"}`}>
        <p>Are you sure?</p>
        <button onClick={() => setDelete(false)} className="btn">
          No
        </button>
        <form action={deleteTradeAction.bind(null, trade._id)}>
          <button className="btn">Yes</button>
        </form>
      </div>
    </div>
  );
};

export default DeleteTrade;
