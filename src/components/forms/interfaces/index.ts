import type { Dayjs } from "dayjs";

export interface CalendarCellI {
  text: string;
  value: Dayjs;
}

export interface OptionI {
  icon?: string;
  id: string | number;
  value: string;
}

export interface DropdowMenuI {
  handleSelect: (option: OptionI) => void;
  initialOption?: OptionI;
  label?: string;
  options: OptionI[];
}

export interface DatePickerI {
  hasError?: boolean;
  label?: string;
  onChange: (newDate: Dayjs) => void;
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
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hasError?: boolean;
  value?: string;
}
