"use client";

import React, { Suspense, useMemo, useState } from "react";
import { Transaction } from "@/src/types";
import { Empty, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import LoadingSpin from "@/src/components/loadingSpin";
import { useTransactionsParams } from "@/src/queries";

const TransactionTable = () => {
  const { data, isLoading, error } = useTransactionsParams();
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

  if (isLoading) <LoadingSpin />;
  if (error || data?.length === 0) <Empty />;

  const columns: ColumnsType<Transaction> = useMemo(
    () => [
      {
        title: "Index",
        key: "index",
        render: (_, __, index) =>
          (pagination.current - 1) * pagination.pageSize + index + 1,
      },
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
        sorter: (a, b) => a.id.localeCompare(b.id),
      },
      {
        title: "Timestamp",
        dataIndex: "timestamp",
        key: "timestamp",
        sorter: (a, b) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
      },
      {
        title: "Amount",
        dataIndex: "amount",
        key: "amount",
        sorter: (a, b) => a.amount - b.amount,
      },
      {
        title: "Merchant",
        dataIndex: ["merchant", "name"],
        key: "merchant",
        sorter: (a, b) => a.merchant.name.localeCompare(b.merchant.name),
      },
      {
        title: "Payment Method",
        dataIndex: "payment_method",
        key: "paymentMethod",
        render: (payment_method) => (
          <>
            {payment_method.type} •••• {payment_method.last4} (
            {payment_method.brand})
          </>
        ),
        sorter: (a, b) =>
          a.payment_method.type.localeCompare(b.payment_method.type),
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        sorter: (a, b) => a.status.localeCompare(b.status),
        render: (status) => (
          <span
            style={{
              textTransform: "capitalize",
              color:
                status === "completed"
                  ? "#52c41a"
                  : status === "pending"
                  ? "#faad14"
                  : status === "failed"
                  ? "#ff4d4f"
                  : "#000000",
            }}
          >
            {status}
          </span>
        ),
      },
    ],
    [pagination]
  );

  return (
    <Suspense fallback={<LoadingSpin />}>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          onChange: (page, pageSize) =>
            setPagination({ current: page, pageSize }),
        }}
        scroll={{ x: "auto" }}
      />
    </Suspense>
  );
};

export default TransactionTable;
