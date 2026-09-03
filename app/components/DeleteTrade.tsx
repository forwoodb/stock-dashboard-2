"use client";

import { Trade } from "../lib/types";

interface DeleteTradeProps {
  deleteTradeAction: (id: string) => Promise<void>;
  trade: Trade;
}
const DeleteTrade = ({ deleteTradeAction, trade }: DeleteTradeProps) => {
  return (
    <div>
      <p>Are you sure?</p>
      <form action={deleteTradeAction.bind(null, trade._id)}>
        <button className="btn">Delete</button>
      </form>
    </div>
  );
};

export default DeleteTrade;
