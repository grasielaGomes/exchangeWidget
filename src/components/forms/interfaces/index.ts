
import type { Dayjs } from "dayjs";

export interface OptionI {
  id: string | number;
  value: string;
  icon?: string;
}

export interface DropdowMenuI {
  handleSelect: (value: string) => void;
  label?: string;
  options: OptionI[];
}

export interface DatePickerI {
  selectedDate: Dayjs;
  onChange: (newDate: Dayjs) => void;
}