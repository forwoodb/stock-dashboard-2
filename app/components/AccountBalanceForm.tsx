"use client";

const AccountBalanceForm = ({ submit, accBal, change }) => {
  return (
    <div>
      <form
        onSubmit={submit}
        className="p-3 mb-3 md:mr-3 bg-white rounded border border-gray-300"
      >
        <label className="floating-label">
          <span>Account Balance</span>
          <input
            type="text"
            name="accBal"
            value={accBal}
            onChange={change}
            placeholder="Account Balance"
            className="input input-md"
          />
        </label>
        <button className="btn">Update Account Balance</button>
      </form>
    </div>
  );
};

export default AccountBalanceForm;
