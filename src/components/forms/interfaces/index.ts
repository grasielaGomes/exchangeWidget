import type { Dayjs } from "dayjs";
import { initialOption } from '../helpers/index';

export interface CalendarCellI {
  text: string;
  value: Dayjs;
}

export interface OptionI {
  icon?: string;
  id?: string | number;
  value: string;
}

export interface DropdowMenuI {
  handleSelect: (option: OptionI) => void;
  initialOption?: OptionI;
  label?: string;
  options: OptionI[];
}

export interface DatePickerI {
  label?: string;
  onChange: (newDate: Dayjs) => void ;
  selectedDate: Dayjs;
}

export interface DatePickerCalendarI {
  onChange: (newDate: Dayjs) => void;
  selectedDate?: Dayjs;
  shownDate: Dayjs;
}

export interface DatePickerSelectorI {
  setShownDate: (newDate: Dayjs) => void;
  shownDate: Dayjs;
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
