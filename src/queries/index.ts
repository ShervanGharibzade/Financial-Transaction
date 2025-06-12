"use client";

import { useQuery } from "@tanstack/react-query";
import { getTransactions, getTransactionsParams } from "../api";
import { QUERY_KEYS } from "./queryKeys";
import { useSearchParams } from "next/navigation";

export const useTransactions = () => {
  return useQuery({
    queryKey: QUERY_KEYS.transactions,
    queryFn: getTransactions,
  });
};

export const useTransactionsParams = () => {
  const searchParams = useSearchParams();

  const selectedFilters: any = {
    timestamp_gte: searchParams.get("timestamp_gte") || "",
    timestamp_lte: searchParams.get("timestamp_lte") || "",
    id: searchParams.get("id") || "",
    amount_gte: searchParams.get("amount_gte") || "",
    amount_lte: searchParams.get("amount_lte") || "",
    status: searchParams.get("status") || "",
    "payment_method.type": searchParams.get("payment_method.type") || "",
    "merchant.name": searchParams.get("merchant.name") || "",
  };

  return useQuery({
    queryKey: QUERY_KEYS.useInfiniteTransactions(selectedFilters),
    queryFn: () => getTransactionsParams({ ...selectedFilters }),
  });
};
