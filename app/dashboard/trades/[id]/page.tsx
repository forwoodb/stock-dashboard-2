import React from "react";

const EditTradePage = () => {
  return (
    <main>
      <h1>Edit Trade</h1>
      <form action="">
        <label className="floating-label">
          <span>Ticker</span>
          <input type="text" placeholder="Ticker" className="input input-md" />
        </label>
      </form>
    </main>
  );
};

export default EditTradePage;
