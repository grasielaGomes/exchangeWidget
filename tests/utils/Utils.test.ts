import { calcStartTransaction, calcEndTransaction } from "../../src/utils";

describe("test utils", () => {
  const page = 6;

  it("should return start pagination value", () => {
    expect(calcStartTransaction(page)).toEqual(25);
  });

  it("should return end pagination value", () => {
    expect(calcEndTransaction(page)).toEqual(30);
  });
});
