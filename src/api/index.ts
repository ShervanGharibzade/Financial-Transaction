import { Transaction } from "../types";

export const getTransactions = async (): Promise<Transaction[] | []> => {
  const res = await fetch("http://localhost:4000/api/transactions/list");

  if (!res.ok) {
    throw new Error(`Failed to fetch transactions: ${res.status}`);
  }

  return res.json();
};

export const getTransactionsParams = async (
  selectedFilters: Record<string, string | number | undefined>
): Promise<Transaction[]> => {
  const baseURL = "http://localhost:4000/transactions";

  const urlParams = new URLSearchParams();

  Object.entries(selectedFilters).forEach(([key, value]) => {
    if (
      value !== undefined &&
      value !== null &&
      value !== "" &&
      value !== "null"
    ) {
      urlParams.set(key, String(value));
      return;
    }
  });

  const res = await fetch(`${baseURL}?${urlParams.toString()}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch transactions: ${res.status}`);
  }

  return res.json();
};

export const postTransaction = async (newTransaction: any): Promise<any> => {
  const baseURL = "http://localhost:4000/transactions";

  const res = await fetch(baseURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTransaction),
  });

  if (!res.ok) {
    throw new Error(`Failed to create transaction: ${res.status}`);
  }

  return res.json();
};
