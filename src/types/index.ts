import dayjs from "dayjs";

export type Transaction = {
  id: string;
  amount: number;
  currency: string;
  status: "completed" | "pending" | "failed";
  timestamp: string;
  description: string;
  merchant: {
    name: string;
    id: string;
  };
  payment_method: {
    type: "credit_card" | "debit_card" | "paypal" | string;
    last4: string;
    brand: string;
  };
  sender: {
    name: string;
    account_id: string;
  };
  receiver: {
    name: string;
    account_id: string;
  };
  fees: {
    processing_fee: number;
    currency: string;
  };
  metadata: {
    order_id: string;
    customer_id: string;
  };
};

export type TPaymentMethod =
  | "credit_card"
  | "paypal"
  | "debit_card"
  | "bank_transfer";

export interface IFilters {
  timestamp_gte: string;
  timestamp_lte: string;
  id: string;
  amount_gte: string;
  amount_lte: string;
  status: string;
  "payment_method.type": string;
  "merchant.name": string;
}

export interface IFormValue {
  timestamp: [dayjs.Dayjs, dayjs.Dayjs];
  id: string;
  amount_gte: string;
  amount_lte: string;
  status: string;
  merchant: string;
  paymentMethod: TPaymentMethod;
}

export interface DataType {
  id: string;
  amount: number;
  currency: string;
  status: "completed" | "pending" | "failed";
  timestamp: string;
  merchant: {
    name: string;
    id: string;
  };
  payment_method: {
    type: string;
    last4: string;
    brand: string;
  };
}

export type TransactionInput = {
  id: string;
  amount: number;
  currency: string;
  status: "completed" | "pending" | "failed";
  timestamp: string;
  description: string;

  merchant: {
    name: string;
    id: string;
  };

  payment_method: {
    type: "credit_card" | "paypal" | "bank_transfer";
    last4: string;
    brand: "visa" | "mastercard" | "amex";
  };

  sender: {
    name: string;
    account_id: string;
  };

  receiver: {
    name: string;
    account_id: string;
  };

  fees: {
    processing_fee: number;
    currency: string;
  };

  metadata: {
    order_id: string;
    customer_id: string;
  };
};
