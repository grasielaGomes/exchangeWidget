import { FullButton } from "../buttons";
import { DropdownMenu } from "../forms";
import { cryptoOptions, currenciesOptions, countries } from "../forms/helpers";
import { AmountInput } from "../forms/AmountInput";
import { Heading } from "../typography";
import { CustomText } from "../typography/CustomText";
import { useExchangeCurrency } from "./hooks/useExchangeCurrency";
import { initialOption } from "../forms/helpers/index";
import { SpinLoading } from "../loadings/SpinLoading";
import { Feedback } from "../feedback";

const styles = {
  container: "shadow-3xl px-6 py-12 w-full",
  content: "md:w-[1095px] md:mx-auto",
  header: "mb-6",
  bodyContainer: "flex flex-col gap-4 md:flex-row md:items-end",
  hiddenEqual: "hidden mb-2 md:block",
  buttonLabelMobile: "md:hidden",
  buttonLabelDesktop: "hidden md:inline",
  successFeedback: (isSuccess: boolean) =>
    `fixed left-0 bottom-0 w-full flex items-center justify-center h-12 bg-primary transition-opacity duration-200 ease-in-out opacity-0 ${
      isSuccess && "opacity-100"
    }`
};

const texts = {
  header: "Exchange",
  from: "Currency from",
  to: "Currency to",
  buttonMobile: "Exchange",
  buttonDesktop: "Save",
  successMessage: "Exchange submitted."
};

export const ExchangeHeader = () => {
  const {
    amountFrom,
    amountTo,
    currencyTo,
    handleAmountFromChange,
    handleAmountToChange,
    handleCurrencyFromChange,
    handleCurrencyToChange,
    handleSaveTransaction,
    isLoading,
    isSuccess,
    isValid
  } = useExchangeCurrency();

  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <Heading variant="h1">{texts.header}</Heading>
        </div>
        <div className={styles.bodyContainer}>
          <DropdownMenu
            options={cryptoOptions}
            label={texts.from}
            handleSelect={(value) => handleCurrencyFromChange(value)}
          />
          <AmountInput
            handleChange={(event) => handleAmountFromChange(event)}
            value={amountFrom}
          />
          <div className={styles.hiddenEqual}>
            <CustomText>=</CustomText>
          </div>
          <DropdownMenu
            handleSelect={(value) => handleCurrencyToChange(value)}
            label={texts.to}
            initialOption={initialOption}
            options={currenciesOptions}
          />
          <AmountInput
            currency={{
              country: countries[currencyTo.value as keyof typeof countries],
              type: currencyTo.value.toLowerCase()
            }}
            handleChange={(amount) => handleAmountToChange(amount)}
            value={amountTo}
          />
          <FullButton handleClick={handleSaveTransaction} isDisabled={!isValid}>
            {isLoading ? (
              <div className="w-9">
                <SpinLoading />
              </div>
            ) : (
              <>
                <span className={styles.buttonLabelMobile}>
                  {texts.buttonMobile}
                </span>
                <span className={styles.buttonLabelDesktop}>
                  {texts.buttonDesktop}
                </span>
              </>
            )}
          </FullButton>
        </div>
      </div>
      {isSuccess && !isLoading && <Feedback isSuccess={isSuccess} />}
    </header>
  );
};
