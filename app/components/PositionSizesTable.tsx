import Link from "next/link";
import { StockInfoType } from "../lib/types";

interface TableProps {
  data: StockInfoType[];
  serverAction: (formData: FormData) => Promise<void>;
}

const PositionSizesTable = ({ data, serverAction }: TableProps) => {
  return (
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
        {data.map((stock) => {
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
                <form action={serverAction}>
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
  );
};

export default PositionSizesTable;
