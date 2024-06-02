import { format, isFuture as isFutureFns } from "date-fns";
import { Month, Year, YearMonthString } from "~/types";

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

export function parseYear(yearMonth: YearMonthString): Year {
  return yearMonth.split("-")[0] as Year;
}
export function parseMonth(yearMonth: YearMonthString): Month {
  return yearMonth.split("-")[1] as Month;
}
export function parseYearMonth(yearMonth: YearMonthString): [Year, Month] {
  return [parseYear(yearMonth), parseMonth(yearMonth)];
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

export function subYear(year: Year) {
  return (parseInt(year) - 1).toString() as Year;
}
export function addYear(year: Year) {
  return (parseInt(year) + 1).toString() as Year;
}
export function subMonth(month: Month) {
  return ("0" + (parseInt(month) - 1)).slice(-2) as Month;
}

export function getLastMonth(yearMonth: YearMonthString) {
  const [year, month] = parseYearMonth(yearMonth);

  if (month === "01") return `${subYear(year)}-12` as YearMonthString;

  return `${year}-${subMonth(month)}` as YearMonthString;
}
