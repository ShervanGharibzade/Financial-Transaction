import TransactionTable from "./table";
import TransactionFilter from "./filters";
import { Button, Col, Row } from "antd";
import Link from "next/link";
import SSRWrapper from "@/src/layouts/ssrLayout";
import { QUERY_KEYS } from "@/src/queries/queryKeys";
import { getTransactionsParams } from "@/src/api";
import { useSearchParams } from "next/navigation";
import { TPaymentMethod } from "@/src/types";

export default function TransactionsPage() {
  const searchParams = useSearchParams();
  const searchQuery = new URLSearchParams(searchParams.toString());

  const filters: Record<string, string | number | undefined> = {
    timestamp_gte: searchQuery.get("timestamp_gte") || "",
    timestamp_lte: searchQuery.get("timestamp_lte") || "",
    id: searchQuery.get("id") || "",
    amount_gte: searchQuery.get("amount_gte") || "",
    amount_lte: searchQuery.get("amount_lte") || "",
    status: searchQuery.get("status") || "",
    "payment_method.type":
      (searchParams.get("payment_method.type") as TPaymentMethod) || "",
    "merchant.name": searchParams.get("merchant.name") || "",
  };

  return (
    <SSRWrapper
      isInfiniteQuery
      queryKey={QUERY_KEYS.useInfiniteTransactions(filters)}
      apiCall={() => getTransactionsParams(filters)}
    >
      <div>
        <Row justify="space-between" align="middle">
          <Col>
            <h1>Financial Transactions</h1>
          </Col>
          <Col>
            <Link href={"/add-transaction"}>
              <Button type="primary">Add Transaction</Button>
            </Link>
          </Col>
        </Row>
        <TransactionFilter />
        <TransactionTable />
      </div>
    </SSRWrapper>
  );
}
