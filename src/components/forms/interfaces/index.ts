
import type { Dayjs } from "dayjs";
import { AmountInput } from '../AmountInput';

export interface CalendarCellI {
  text: string;
  value: Dayjs;
}

export interface OptionI {
  id: string | number;
  value: string;
  icon?: string;
}

export interface DropdowMenuI {
  handleSelect: (option: OptionI) => void;
  label?: string;
  options: OptionI[];
}

export interface DatePickerI {
  selectedDate: Dayjs;
  onChange: (newDate: Dayjs) => void;
}

export interface DatePickerCalendarI {
  shownDate: Dayjs;
  selectedDate: Dayjs;
  onChange: (newDate: Dayjs) => void;
}

export interface DatePickerSelectorI {
  shownDate: Dayjs;
  setShownDate: React.Dispatch<React.SetStateAction<Dayjs>>;
}

interface CurrencyI {
  country: string;
  type: string;
}

export interface AmountInputI {
  currency?: CurrencyI;
  handleSubmitAmount: (amount: string) => void;
  hasError?: boolean;
  initialValue?: string;
}