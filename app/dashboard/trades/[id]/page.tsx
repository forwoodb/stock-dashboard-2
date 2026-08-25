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
      </form>
    </main>
  );
};

export default EditTradePage;
