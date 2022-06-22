import { CustomText } from "../typography";
import { AmountInputI } from "./interfaces";
import { formatCurrency } from "../../utils";

const styles = {
  container: (hasError: boolean) => hasError && "md:-mb-5",
  label: "ml-1 mb-1",
  input: (hasError: boolean) =>
    `bg-white text-sm placeholder:text-dark h-11 w-full leading-5 border rounded-lg border-neutral px-4 py-2 hover:border-primaryHover focus:outline-none focus:border-primary focus:ring-primary focus:ring-0 ${
      hasError && "border-pink-500"
    }`,
  error: "mt-1 pl-2 text-pink-500"
};

const texts = {
  label: "Amount",
  placeholder: "Enter the amount",
  errorMessage: "Please enter a valid amount"
};

export const AmountInput = ({
  currency,
  handleChange,
  hasError = false,
  value
}: AmountInputI) => {
  return (
    <div className={styles.container(hasError) || ""}>
      <div className={styles.label}>
        <CustomText color="neutral3" variant="small">
          {texts.label}
        </CustomText>
      </div>
      <input
        onChange={handleChange}
        type="tel"
        value={
          formatCurrency(
            value as string,
            currency?.country || "",
            currency?.type || ""
          ) || value
        }
        className={styles.input(hasError)}
        placeholder={texts.placeholder}
      />

      {hasError && (
        <div className={styles.error}>
          <CustomText variant="tiny">{texts.errorMessage}</CustomText>
        </div>
      )}
    </div>
  );
};
