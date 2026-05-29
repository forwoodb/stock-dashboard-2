import { connectDb } from "@/app/lib/mongodb";
import Stock from "@/app/models/Stock";

const PositionsPage = async () => {
  await connectDb();

  const data = await Stock.find({ position: true }).lean();
  const stocks = JSON.parse(JSON.stringify(data));
  console.log(stocks);

  return (
    <main>
      <h1>Position Sizes Page</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => {
            return (
              <tr key={stock._id}>
                <td>{stock.ticker}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
};

export default PositionsPage;
