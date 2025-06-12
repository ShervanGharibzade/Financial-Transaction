import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TransactionTable from "../index";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { mockTransactions } from "../../__mocks__/transactions";
import * as queries from "@/src/queries";

jest.mock("@/src/queries", () => ({
  useTransactionsParams: jest.fn(),
}));

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const testQueryClient = createTestQueryClient();
  return (
    <QueryClientProvider client={testQueryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe("TransactionTable", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders table with transactions", () => {
    (queries.useTransactionsParams as jest.Mock).mockReturnValue({
      data: mockTransactions,
      isLoading: false,
      error: null,
    });

    render(<TransactionTable />, { wrapper });
    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Test Merchant")).toBeInTheDocument();
  });

  it("renders empty state when no data", () => {
    (queries.useTransactionsParams as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    });

    render(<TransactionTable />, { wrapper });
    expect(screen.getAllByText("No data").length).toBeGreaterThan(0);
  });

  it("renders payment method details correctly", () => {
    (queries.useTransactionsParams as jest.Mock).mockReturnValue({
      data: mockTransactions,
      isLoading: false,
      error: null,
    });

    render(<TransactionTable />, { wrapper });
    expect(screen.getByText(/credit_card.*1234.*visa/i)).toBeInTheDocument();
  });
});
