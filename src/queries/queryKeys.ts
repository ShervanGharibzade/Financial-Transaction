export const QUERY_KEYS = {
  transactions: ["transactions"],
  useInfiniteTransactions: (param: any) => ["transactions" + param],
  createTransactions: (id: string) => ["createTransactions", id],
};
