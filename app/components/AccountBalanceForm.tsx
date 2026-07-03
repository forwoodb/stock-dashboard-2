const AccountBalanceForm = () => {
  return (
    <div>
      <form action="">
        <label className="floating-label">
          <span>Account Balance</span>
          <input
            type="text"
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
