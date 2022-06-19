import { FullButton } from "../buttons";
import { DropdowMenu } from "../forms";
import { cryptoOptions, currenciesOptions, countries } from "../forms/helpers";
import { AmountInput } from "../forms/AmountInput";
import { Heading } from "../typography";
import { CustomText } from "../typography/CustomText";
import { useExchangeCurrency } from "./hooks/useExchangeCurrency";
import { initialOption } from '../forms/helpers/index';

const styles = {
  container: "shadow-3xl px-6 py-12 w-full",
  content: "md:w-[1095px] md:mx-auto",
  header: "mb-6",
  bodyContainer: "flex flex-col gap-4 md:flex-row md:items-end",
  hiddenEqual: "hidden mb-2 md:block",
  buttonLabelMobile: "md:hidden",
  buttonLabelDesktop: "hidden md:inline"
};

const texts = {
  header: "Exchange",
  from: "Currency from",
  to: "Currency to",
  buttonMobile: "Exchange",
  buttonDesktop: "Save"
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
    isValidated
  } = useExchangeCurrency();

  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <Heading variant="h1">{texts.header}</Heading>
        </div>
        <div className={styles.bodyContainer}>
          <DropdowMenu
            options={cryptoOptions}
            label={texts.from}
            handleSelect={(value) => handleCurrencyFromChange(value)}
          />
          <AmountInput
            handleChange={(event) => handleAmountFromChange(event)}
            hasError={!amountFrom && isValidated}
            value={amountFrom}
          />
          <div className={styles.hiddenEqual}>
            <CustomText>=</CustomText>
          </div>
          <DropdowMenu
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
            hasError={!amountFrom && !amountTo && isValidated}
            value={amountTo}
          />
          <FullButton handleClick={handleSaveTransaction} type="submit">
            <>
              <span className={styles.buttonLabelMobile}>
                {texts.buttonMobile}
              </span>
              <span className={styles.buttonLabelDesktop}>
                {texts.buttonDesktop}
              </span>
            </>
          </FullButton>
        </div>
      </div>
    </header>
  );
};
