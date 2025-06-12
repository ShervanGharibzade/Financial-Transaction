import { Transaction } from "@/src/types";

export const mockTransactions: Transaction[] = [
  {
    id: "1",
    timestamp: "2024-03-20T10:00:00Z",
    amount: 100.5,
    currency: "USD",
    description: "Test transaction 1",
    merchant: {
      name: "Test Merchant",
      id: "merch_1",
    },
    payment_method: {
      type: "credit_card",
      last4: "1234",
      brand: "visa",
    },
    status: "completed",
    sender: {
      name: "John Doe",
      account_id: "acc_1",
    },
    receiver: {
      name: "Test Merchant",
      account_id: "acc_2",
    },
    fees: {
      processing_fee: 2.5,
      currency: "USD",
    },
    metadata: {
      order_id: "order_1",
      customer_id: "cust_1",
    },
  },
  {
    id: "2",
    timestamp: "2024-03-20T11:00:00Z",
    amount: 200.75,
    currency: "USD",
    description: "Test transaction 2",
    merchant: {
      name: "Another Merchant",
      id: "merch_2",
    },
    payment_method: {
      type: "paypal",
      last4: "5678",
      brand: "paypal",
    },
    status: "pending",
    sender: {
      name: "Jane Smith",
      account_id: "acc_3",
    },
    receiver: {
      name: "Another Merchant",
      account_id: "acc_4",
    },
    fees: {
      processing_fee: 5.0,
      currency: "USD",
    },
    metadata: {
      order_id: "order_2",
      customer_id: "cust_2",
    },
  },
];
