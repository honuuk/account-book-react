import { format } from "date-fns";
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

export const getYearMonth = (date: Date) =>
  format(date, "yyyy-MM") as YearMonthString;
export const parseYear = (date: YearMonthString) => date.split("-")[0];
export const parseMonth = (date: YearMonthString) => date.split("-")[1];
