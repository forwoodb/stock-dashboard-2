export type LoginState = {
  message: string | null;
};

export interface StockType {
  _id: string;
  ticker: string;
  company: string;
  averageCost: number;
  positionSize: number;
}

export interface csvRow {
  ticker: string;
  Time: string;
  Close: number;
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
  Time: string;
  Close: number;
  "5D"?: number;
  "10D"?: number;
  "20D"?: number;
  "50D"?: number;
  "100D"?: number;
  "200D"?: number;
  averageCost: number;
  positionSize: number;
}

export interface Transaction {
  type: string;
  ticker: string;
  Time: string;
  Close: number;
  "5D"?: number;
  "10D"?: number;
  "20D"?: number;
  "50D"?: number;
  "100D"?: number;
  "200D"?: number;
}

export interface UserType {
  _id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
  role: string;
  banned: boolean;
  accountBalance: string;
  stopLoss: string;
}

export type MAKey = "5D" | "10D" | "20D" | "50D" | "100D" | "200D";

export interface TableProps {
  userId: string;
  data: StockInfoType[];
  serverAction: (formData: FormData) => Promise<void>;
  accBal: string;
  stopLoss: string;
}

export interface Trade {
  _id: string;
  ticker: string;
  type: string;
  price: number;
  positionSize: number;
  dollarAmount: number;
  fiveDayAvg: number;
  tenDayAvg: number;
  twentyDayAvg: number;
  fiftyDayAvg: number;
  oneHundredDayAvg: number;
  twoHundredDayAvg: number;
  createdAt: Date;
}
