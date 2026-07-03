import React from "react";

const StopLossForm = () => {
  return (
    <form>
      <label className="floating-label">
        <span>Stop-Loss %</span>
        <input
          type="text"
          placeholder="Stop-Loss %"
          className="input input-md"
        />
      </label>
      <button className="btn">Update Stop-Loss</button>
    </form>
  );
};

export default StopLossForm;
