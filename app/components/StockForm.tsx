interface StockFormProps {
  mode: string;
  formAction: (formData: FormData) => Promise<void>;
  ticker: string;
  company: string;
}

const StockForm = ({ mode, formAction, ticker, company }: StockFormProps) => {
  return (
    <form
      action={formAction}
      className="flex justify-between items-center w-[95%] mx-auto"
    >
      <label htmlFor="ticker">Ticker: </label>
      <input
        type="text"
        name="ticker"
        id="ticker"
        defaultValue={ticker}
        className="input mr-4"
      />

      <label htmlFor="company">Company: </label>
      <input
        type="text"
        name="company"
        id="company"
        defaultValue={company}
        className="input mr-4"
      />

      <button className="btn">
        {mode === "create" ? "Add" : "Update"} Stock
      </button>
    </form>
  );
};

export default StockForm;
