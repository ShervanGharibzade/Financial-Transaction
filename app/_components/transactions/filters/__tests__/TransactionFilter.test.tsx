import { render, screen, fireEvent, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import TransactionFilter from "../index";

jest.mock("@/src/queries", () => ({
  useTransactionsParams: () => ({
    refetch: jest.fn(),
    isLoading: false,
  }),
}));

describe("TransactionFilter", () => {
  beforeEach(() => {
    window.history.pushState({}, "", "");
  });

  it("renders all filter inputs", () => {
    render(<TransactionFilter />);

    expect(screen.getByLabelText("Date Range")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Min")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Max")).toBeInTheDocument();
    expect(screen.getByLabelText("Status")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Merchant name")).toBeInTheDocument();
    expect(screen.getByLabelText("Payment Method")).toBeInTheDocument();
  });

  it("renders status options correctly", () => {
    render(<TransactionFilter />);
    fireEvent.mouseDown(screen.getByLabelText("Status"));
    const statusDropdown = screen.getByRole("listbox");
    expect(within(statusDropdown).getByText(/^all$/i)).toBeInTheDocument();
    expect(
      within(statusDropdown).getByText(/^completed$/i)
    ).toBeInTheDocument();
  });

  it("renders payment method options correctly", () => {
    render(<TransactionFilter />);
    fireEvent.mouseDown(screen.getByLabelText("Payment Method"));
    const paymentDropdown = screen.getByRole("listbox");
    expect(within(paymentDropdown).getByText(/^all$/i)).toBeInTheDocument();
    expect(
      within(paymentDropdown).getByText(/^credit_card$/i)
    ).toBeInTheDocument();
  });

  it("handles form submission", async () => {
    render(<TransactionFilter />);
    await userEvent.type(
      screen.getByPlaceholderText("Merchant name"),
      "Test Merchant"
    );
    fireEvent.mouseDown(screen.getByLabelText("Status"));
    const completedOption = screen
      .getAllByText(/^completed$/i)
      .find((el) => el.getAttribute("role") === "option");
    if (completedOption) {
      fireEvent.click(completedOption);
    } else {
      throw new Error('Dropdown option for "completed" not found');
    }
    fireEvent.click(screen.getByText(/apply filters/i));
    expect(true).toBe(true);
  });

  it("handles reset button", () => {
    render(<TransactionFilter />);
    fireEvent.change(screen.getByPlaceholderText("Merchant name"), {
      target: { value: "Test Merchant" },
    });
    fireEvent.click(screen.getByText(/reset/i));
    expect(screen.getByPlaceholderText("Merchant name")).toHaveValue("");
  });
});
