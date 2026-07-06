const StopLossForm = (value) => {
  return (
    <form className="p-3 mb-3 md:mr-3 bg-white rounded border border-gray-300">
      <label className="floating-label">
        <span>Stop-Loss %</span>
        <input
          type="text"
          name="stopLoss"
          value={value}
          placeholder="Stop-Loss %"
          className="input input-md"
        />
      </label>
      <button className="btn">Update Stop-Loss</button>
    </form>
  );
};

export default StopLossForm;
