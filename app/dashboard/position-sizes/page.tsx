import { connectDb } from "@/app/lib/mongodb";
import Stock from "@/app/models/Stock";
import { revalidatePath } from "next/cache";
import { mergeCSVData } from "@/app/lib/functions";
import { StockInfoType, StockType } from "@/app/lib/types";
import Link from "next/link";

const PositionsPage = async () => {
  await connectDb();

  const data = await Stock.find({ position: true }).lean();
  const stocks: StockType[] = JSON.parse(JSON.stringify(data));

  const merge = mergeCSVData(stocks) as StockInfoType[];

  const toWatchList = async (formData: FormData) => {
    "use server";
    const id = formData.get("id");

    await Stock.findByIdAndUpdate(id, {
      positionSize: 0,
      averageCost: 0,
      watchList: true,
      position: false,
    });
    revalidatePath("/dashboard/position-sizes");
  };

  return (
    <main>
      <h1>Position Sizes Page</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Ticker</th>
            <th>Time</th>
            <th>Close</th>
            <th>5D</th>
            <th>10D</th>
            <th>20D</th>
            <th>50D</th>
            <th>100D</th>
            <th>200D</th>
            <th>AvgCost</th>
            <th>PosSize</th>
          </tr>
        </thead>
        <tbody>
          {merge.map((stock) => {
            return (
              <tr key={stock._id}>
                <td>{stock.ticker}</td>
                <td>{stock.Time}</td>
                <td>{stock.Close}</td>
                <td>{stock["5D"]}</td>
                <td>{stock["10D"]}</td>
                <td>{stock["20D"]}</td>
                <td>{stock["50D"]}</td>
                <td>{stock["100D"]}</td>
                <td>{stock["200D"]}</td>
                <td>{stock.averageCost}</td>
                <td>{stock.positionSize}</td>
                <td>
                  <form action={toWatchList}>
                    <input type="hidden" name="id" value={stock._id} />
                    <button className="btn">Watch</button>
                  </form>
                </td>
                <td>
                  <Link
                    href={`/dashboard/edit-stock/${stock._id}`}
                    className="btn"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
};

export default PositionsPage;
