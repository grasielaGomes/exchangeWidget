import { Dayjs } from "dayjs";
import { CalendarCellI } from "../interfaces";

export function changeDateMonth(date: Dayjs, isNextMonth: boolean): Dayjs {
  // Should decrease year
  if (date.month() === 0 && !isNextMonth) {
    return date.set("year", date.year() - 1).set("month", 11);
  }

  // Should increase year
  if (date.month() === 11 && isNextMonth) {
    return date.set("year", date.year() + 1).set("month", 0);
  }

  // Add or substract
  return date.add(isNextMonth ? 1 : -1, "month");
}

function getCalendarCells(date: Dayjs): CalendarCellI[] {
  const daysInMonth = date.daysInMonth();
  const calendarCells: CalendarCellI[] = [];

  const prepareCell = (date: Dayjs, dayNumber: number) => {
    return {
      text: String(dayNumber),
      value: date.clone().set("date", dayNumber)
    };
  };

  // Push current month day cells
  for (let i = 0; i < daysInMonth; i++) {
    calendarCells.push(prepareCell(date, i + 1));
  }

  // The calender will show only the days in the current month. To add more, change the first value in equation below
  const cellsToAdd = daysInMonth - daysInMonth;

  // Add to start from prev month
  const lastMonth = date.subtract(1, "month");
  for (let i = 0; i < Math.floor(cellsToAdd / 2); i++) {
    calendarCells.unshift(prepareCell(lastMonth, lastMonth.daysInMonth() - i));
  }

  // Add to end from next month
  const nextMonth = date.add(1, "month");
  for (let i = 0; i < Math.round(cellsToAdd / 2); i++) {
    calendarCells.push(prepareCell(nextMonth, i + 1));
  }

  return calendarCells;
}

export function getCalendarRows(date: Dayjs): Array<CalendarCellI[]> {
  const cells = getCalendarCells(date);
  const rows: Array<CalendarCellI[]> = [];

  // Split one array into chunks
  for (let i = 0; i < cells.length; i += 7) {
    rows.push(cells.slice(i, i + 7));
  }

  return rows;
}


