import { useMemo } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";

import { CashFlow, CashFlowType, Month } from "~/types";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { typeLabelMap } from ".";

const MONTHS = [
  {
    name: "1월",
    month: "01",
  },
  {
    name: "2월",
    month: "02",
  },
  {
    name: "3월",
    month: "03",
  },
  {
    name: "4월",
    month: "04",
  },
  {
    name: "5월",
    month: "05",
  },
  {
    name: "6월",
    month: "06",
  },
  {
    name: "7월",
    month: "07",
  },
  {
    name: "8월",
    month: "08",
  },
  {
    name: "9월",
    month: "09",
  },
  {
    name: "10월",
    month: "10",
  },
  {
    name: "11월",
    month: "11",
  },
  {
    name: "12월",
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
        (acc, { month, spending }) => ({ ...acc, [month]: spending }),
        {} as Record<Month, number>
      );
    if (type === "income")
      return currentYear.reduce(
        (acc, { month, income }) => ({ ...acc, [month]: income }),
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
          [typeLabelMap[type]]: annualData[month as Month],
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
          fontSize={9}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value.toLocaleString()}원`}
        />
        <Bar
          dataKey={typeLabelMap[type]}
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
        <Tooltip
          filterNull
          cursor={false}
          content={(tooltipProps: TooltipProps<number, string>) => (
            <CustomToolTip {...tooltipProps} type={type} />
          )}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

const CustomToolTip: React.FC<
  TooltipProps<number, string> & { type: CashFlowType }
> = ({ payload = [], type }) => {
  if (!payload || payload.length === 0) return null;

  return (
    <Card className="shadow-xl">
      <CardHeader className="p-3 pb-0">
        <CardTitle className="text-sm font-normal">
          {payload[0].payload.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <div className="text-lg font-bold">
          {type === "spending"
            ? `-${payload[0].value?.toLocaleString()}원`
            : `${payload[0].value?.toLocaleString()}원`}
        </div>
      </CardContent>
    </Card>
  );
};
