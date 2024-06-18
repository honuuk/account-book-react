import { useMemo } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

import { CashFlow, CashFlowType, Month } from "~/types";

const MONTHS = [
  {
    name: "Jan",
    month: "01",
  },
  {
    name: "Feb",
    month: "02",
  },
  {
    name: "Mar",
    month: "03",
  },
  {
    name: "Apr",
    month: "04",
  },
  {
    name: "May",
    month: "05",
  },
  {
    name: "Jun",
    month: "06",
  },
  {
    name: "Jul",
    month: "07",
  },
  {
    name: "Aug",
    month: "08",
  },
  {
    name: "Sep",
    month: "09",
  },
  {
    name: "Oct",
    month: "10",
  },
  {
    name: "Nov",
    month: "11",
  },
  {
    name: "Dec",
    month: "12",
  },
];

interface Props {
  type: CashFlowType;
  currentYear: CashFlow[];
}

export default function AnnualTrend({ type, currentYear }: Props) {
  const annualData = useMemo(() => {
    if (type === "spending")
      return currentYear.reduce(
        (acc, { month, spending }) => ({ ...acc, [month]: spending || 0 }),
        {} as Record<Month, number>
      );
    if (type === "income")
      return currentYear.reduce(
        (acc, { month, income }) => ({ ...acc, [month]: income || 0 }),
        {} as Record<Month, number>
      );
    if (type === "saving")
      return currentYear
        .filter(({ income, spending }) => income && spending)
        .reduce(
          (acc, cashFlow) => ({
            ...acc,
            [cashFlow.month]: cashFlow.income! - cashFlow.spending!,
          }),
          {} as Record<Month, number>
        );
    return {} as Record<Month, number>;
  }, [type, currentYear]);

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart
        data={MONTHS.map(({ name, month }) => ({
          name,
          total: annualData[month as Month],
        }))}
      >
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `₩${value.toLocaleString()}`}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
