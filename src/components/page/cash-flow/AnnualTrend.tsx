import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

import { CashFlowService } from "~/service/cash-flow";
import { CashFlowType, Month } from "~/types";

interface Props {
  type: CashFlowType;
  cashFlowService: CashFlowService;
}

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

export default function AnnualTrend({ type, cashFlowService }: Props) {
  const annualData = cashFlowService.getAnnualData(type);
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
