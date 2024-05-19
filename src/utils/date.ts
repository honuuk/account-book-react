import { format, isFuture as isFutureFns } from "date-fns";
import { Month, YearMonthString } from "~/types";

export const MONTHS: Month[] = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];

export function getYearMonth(date: Date) {
  return format(date, "yyyy-MM") as YearMonthString;
}

export function parseYear(yearMonth: YearMonthString) {
  return yearMonth.split("-")[0];
}
export function parseMonth(yearMonth: YearMonthString) {
  return yearMonth.split("-")[1];
}
export function getMonthName(yearMonth: YearMonthString) {
  return format(yearMonth, "MMM");
}

export function isFuture(yearMonth: YearMonthString) {
  return isFutureFns(yearMonth);
}
export function isThisYear(year: string) {
  return year === format(new Date(), "yyyy");
}

export function subYear(year: string) {
  return (parseInt(year) - 1).toString();
}
export function addYear(year: string) {
  return (parseInt(year) + 1).toString();
}
