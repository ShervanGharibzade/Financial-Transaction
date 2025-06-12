"use client";

import { Layout } from "antd";
import { Suspense } from "react";
import TransactionsPage from "./_components/transactions";
import LoadingSpin from "@/src/components/loadingSpin";

const Home = () => {
  return (
    <Layout style={{ minHeight: "100vh", padding: "20px" }}>
      <Suspense fallback={<LoadingSpin />}>
        <TransactionsPage />
      </Suspense>
    </Layout>
  );
};

export default Home;
