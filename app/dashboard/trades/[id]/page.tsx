import Transaction from "@/app/models/Transaction";

interface PageProps {
  params: Promise<{ id: string }>;
}

const EditTradePage = async ({ params }: PageProps) => {
  const { id } = await params;

  const data = await Transaction.findOne({ _id: id }).lean();
  const trade = JSON.parse(JSON.stringify(data));
  console.log(trade);

  return (
    <main>
      <h1>Edit Trade</h1>
      <form action="">
        <label className="floating-label">
          <span>Ticker</span>
          <input
            type="text"
            placeholder="Ticker"
            defaultValue={trade.ticker}
            className="input input-md"
          />
        </label>
        <label className="floating-label">
          <span>Type</span>
          <input
            type="text"
            placeholder="Type"
            defaultValue={trade.type}
            className="input input-md"
          />
        </label>
        <label className="floating-label">
          <span>Price</span>
          <input
            type="text"
            placeholder="Price"
            defaultValue={trade.price}
            className="input input-md"
          />
        </label>

        <label className="floating-label">
          <span>Dollar Amount</span>
          <input
            type="text"
            placeholder="Dollar Amount"
            defaultValue={trade.dollarAmount}
            className="input input-md"
          />
        </label>
        <label className="floating-label">
          <span>5D</span>
          <input
            type="text"
            placeholder="5D"
            defaultValue={trade.fiveDayAvg}
            className="input input-md"
          />
        </label>
        <label className="floating-label">
          <span>10D</span>
          <input
            type="text"
            placeholder="10D"
            defaultValue={trade.tenDayAvg}
            className="input input-md"
          />
        </label>
        <label className="floating-label">
          <span>20D</span>
          <input
            type="text"
            placeholder="20D"
            defaultValue={trade.twentyDayAvg}
            className="input input-md"
          />
        </label>
        <label className="floating-label">
          <span>50D</span>
          <input
            type="text"
            placeholder="50D"
            defaultValue={trade.fiftyDayAvg}
            className="input input-md"
          />
        </label>
        <label className="floating-label">
          <span>100D</span>
          <input
            type="text"
            placeholder="100D"
            defaultValue={trade.oneHundredDayAvg}
            className="input input-md"
          />
        </label>
        <label className="floating-label">
          <span>200D</span>
          <input
            type="text"
            placeholder="200D"
            defaultValue={trade.twoHundredDayAvg}
            className="input input-md"
          />
        </label>
      </form>
    </main>
  );
};

export default EditTradePage;
