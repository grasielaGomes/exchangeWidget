import { render, screen } from "@testing-library/react";
import { Pagination } from "../../src/components/pagination/Pagination";

describe("Tests on <Pagination />", () => {
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
  const { container } = render(
    <Pagination handlePage={() => {}} list={transactions} />
  );

  it("should match with snapshot", () => {
    expect(container).toMatchSnapshot();
  });

  it("should show 1 page", () => {
    render(<Pagination handlePage={() => {}} list={transactions} />);
    expect(screen.getByText("1")).toBeTruthy();
  });

  it("should show custom error message", () => {});
});
