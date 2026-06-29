import { StockInfoType } from "../lib/types";

interface WatchListProps {
  mode: string;
  data: StockInfoType[];
  formAction: (formData: FormData) => Promise<void>;
}

const WatchListTable = ({ mode, data, formAction }: WatchListProps) => {
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
              <td>
                <form action={formAction}>
                  <input type="hidden" name="id" value={stock._id} />
                  <button className="btn">
                    {mode === "watchList" ? "Position" : "WatchList"}
                  </button>
                </form>
              </td>
              <td>
                <button className="btn">Edit</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default WatchListTable;
