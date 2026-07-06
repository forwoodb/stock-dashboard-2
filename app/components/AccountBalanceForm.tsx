const AccountBalanceForm = () => {
  return (
    <div>
      <form
        action=""
        className="p-3 mb-3 md:mr-3 bg-white rounded border border-gray-300"
      >
        <label className="floating-label">
          <span>Account Balance</span>
          <input
            type="text"
            name="accountBalance"
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
