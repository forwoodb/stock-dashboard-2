import React from "react";

const TradeForm = () => {
  return (
    <div>
      <form action="">
        <select name="trade" id="trade">
          <option value="buy">Buy</option>
          <option value="sell">Sell</option>
        </select>
        <button className="btn">Trade</button>
      </form>
    </div>
  );
};

export default TradeForm;
