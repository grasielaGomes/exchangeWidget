import { useState, useEffect } from "react";
import { CustomText } from "../typography";
import { AmountInputI } from "./interfaces";
import { formatCurrency } from "../../utils";

export const AmountInput = ({
  currency,
  handleSubmitAmount,
  hasError,
  initialValue
}: AmountInputI) => {
  const [amount, setAmount] = useState(initialValue);

  useEffect(() => {
    handleSubmitAmount(amount || "");
  }, [amount]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
  };

  return (
    <div className={hasError ? "md:-mb-5" : ""}>
      <div className="flex flex-col gap-1">
        <div className="ml-1">
          <CustomText color="neutral3" variant="small">
            Amount
          </CustomText>
        </div>
        <input
          onChange={handleChange}
          type="tel"
          value={
            formatCurrency(
              amount as string,
              currency?.country || "",
              currency?.type || ""
            ) || amount
          }
          className={`bg-white text-sm placeholder:text-dark h-11 w-full leading-5 border rounded-lg border-neutral px-4 py-2 hover:border-primaryHover focus:outline-none focus:border-primary focus:ring-primary focus:ring-0 ${
            hasError && "border-pink-500"
          }`}
          placeholder="Enter the amount"
        />
      </div>
      {hasError && (
        <div className="mt-1 pl-2 text-pink-500">
          <CustomText variant="tiny">Please, enter a amount</CustomText>
        </div>
      )}
    </div>
  );
};
