interface StockFormProps {
  formAction: (formData: FormData) => Promise<void>;
}

const StockForm = ({ formAction }: StockFormProps) => {
  return (
    <form
      action={formAction}
      className="flex justify-between items-center w-[95%] mx-auto"
    >
      <label htmlFor="ticker">Ticker: </label>
      <input type="text" name="ticker" id="ticker" className="input mr-4" />

      <label htmlFor="company">Company: </label>
      <input type="text" name="company" id="company" className="input mr-4" />

      <button className="btn">Add Stock</button>
    </form>
  );
};

export default StockForm;
