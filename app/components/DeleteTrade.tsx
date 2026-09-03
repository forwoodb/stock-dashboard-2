"use client";

interface DeleteTradeProps {
  deleteTradeAction: () => Promise<void>;
}
const DeleteTrade = ({ deleteTradeAction }: DeleteTradeProps) => {
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
