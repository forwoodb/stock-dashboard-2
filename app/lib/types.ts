export type LoginState = {
  message: string | null;
};

export interface StockType {
  _id: string;
  ticker: string;
  company: string;
  averageCost: number;
}

export interface csvRow {
  ticker: string;
  Time?: string;
  Close?: number;
  "5D"?: number;
  "10D"?: number;
  "20D"?: number;
  "50D"?: number;
  "100D"?: number;
  "200D"?: number;
}

export interface StockInfoType {
  _id: string;
  ticker: string;
  Time?: string;
  Close?: number;
  "5D"?: number;
  "10D"?: number;
  "20D"?: number;
  "50D"?: number;
  "100D"?: number;
  "200D"?: number;
}
