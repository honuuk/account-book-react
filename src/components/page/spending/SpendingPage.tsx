import { useMemo } from "react";

import { getLastMonth } from "~/utils/date";
import { type Spending, YearMonthString } from "~/types";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

import { PortionChart } from "./PortionChart";

interface Props {
  spendings: Spending[];
  lastYearSpendings: Spending[];
  yearMonth: YearMonthString;
}

const SpendingPage: React.FC<Props> = ({
  spendings,
  lastYearSpendings,
  yearMonth,
}) => {
  const spendingMap: Record<YearMonthString, Spending> = useMemo(() => {
    const thisYearMap = spendings.reduce(
      (acc, spending) => ({
        ...acc,
        [`${spending.year}-${spending.month}`]: spending,
      }),
      {}
    );
    const lastYearMap = lastYearSpendings.reduce(
      (acc, spending) => ({
        ...acc,
        [`${spending.year}-${spending.month}`]: spending,
      }),
      {}
    );

    return { ...thisYearMap, ...lastYearMap };
  }, [spendings, lastYearSpendings]);

  const getMoM = () => {
    const current = spendingMap[yearMonth];
    const last = spendingMap[getLastMonth(yearMonth)];

    if (!current || !last) return "";

    const MoM = ((current.spending - last.spending) / last.spending) * 100;
    return MoM > 0
      ? `+${MoM.toFixed(2)}% from last month`
      : `${MoM.toFixed(2)}% from last month`;
  };

  const getYoY = () => {
    const current = spendings.reduce(
      (acc, spending) => acc + spending.spending,
      0
    );
    const last = lastYearSpendings.reduce(
      (acc, spending) => acc + spending.spending,
      0
    );

    if (!current || !last) return "";

    const YoY = ((current - last) / last) * 100;
    return YoY > 0
      ? `+${YoY.toFixed(2)}% from last year`
      : `${YoY.toFixed(2)}% from last year`;
  };

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              이번 달 총 지출
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {spendingMap[yearMonth]
                ? `- ${spendingMap[yearMonth].spending.toLocaleString()} 원`
                : "-"}
            </div>
            <p className="text-xs text-muted-foreground">{getMoM()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">올해 총 지출</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {`- ${spendings
                .reduce((acc, { spending }) => acc + spending, 0)
                .toLocaleString()} 원`}
            </div>
            <p className="text-xs text-muted-foreground">{getYoY()}</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle>지출금액</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <PortionChart />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default SpendingPage;
