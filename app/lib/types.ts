export type LoginState = {
  message: string | null;
};

export interface StockType {
  _id: string;
  ticker: string;
  company: string;
  averageCost: number;
}
