import {
  calcStartTransaction,
  calcEndTransaction,
  formatCurrency,
  filterTransactions
} from "../../src/utils";

describe("test utils", () => {
  const page = 6;

  it("should return start pagination value", () => {
    expect(calcStartTransaction(page)).toEqual(25);
  });

  it("should return end pagination value", () => {
    expect(calcEndTransaction(page)).toEqual(30);
  });

  it("should return formatted currency", () => {
    expect(formatCurrency("12300", "en-US", "USD")).toEqual("$123.00");
  });

  it("should filter transactions by date and type", () => {
    const transactions = [
      {
        amount: "100",
        currencyRate: 48000,
        date: "2020-01-01 08:02:17",
        from: "Bitcoin",
        id: "1",
        to: "USD",
        totalAmount: "200",
        status: "LIVE"
      },
      {
        amount: "100",
        currencyRate: 3.45,
        date: "2020-01-01 08:02:17",
        from: "Ethereum",
        id: "2",
        to: "EUR",
        totalAmount: "145",
        status: "EXCHANGED"
      }
    ];

    const filteredList = filterTransactions({
      endDate: "2020-01-01 08:02:17",
      startDate: "2020-01-01 08:02:17",
      transactions,
      type: "LIVE"
    });

    expect(filteredList.length).toEqual(1);
  });
});
