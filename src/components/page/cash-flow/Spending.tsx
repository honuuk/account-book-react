import { useMemo } from "react";

import { getLastMonth } from "~/utils/date";
import { type CashFlow, YearMonthString } from "~/types";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

import { PortionChart } from "./PortionChart";

interface Props {
  cashFlows: CashFlow[];
  lastYearCashFlows: CashFlow[];
  yearMonth: YearMonthString;
}

const Spending: React.FC<Props> = ({
  cashFlows,
  lastYearCashFlows,
  yearMonth,
}) => {
  const cashFlowMap: Record<YearMonthString, CashFlow> = useMemo(() => {
    const thisYearMap = cashFlows.reduce(
      (acc, cashFlow) => ({
        ...acc,
        [`${cashFlow.year}-${cashFlow.month}`]: cashFlow,
      }),
      {}
    );
    const lastYearMap = lastYearCashFlows.reduce(
      (acc, cashFlow) => ({
        ...acc,
        [`${cashFlow.year}-${cashFlow.month}`]: cashFlow,
      }),
      {}
    );

    return { ...thisYearMap, ...lastYearMap };
  }, [cashFlows, lastYearCashFlows]);

  const getMoM = () => {
    const current = cashFlowMap[yearMonth];
    const last = cashFlowMap[getLastMonth(yearMonth)];

    if (!current || !last) return "";

    const MoM = ((current.spending - last.spending) / last.spending) * 100;
    return MoM > 0
      ? `+${MoM.toFixed(2)}% from last month`
      : `${MoM.toFixed(2)}% from last month`;
  };

  const getYoY = () => {
    const current = cashFlows.reduce(
      (acc, cashFlow) => acc + cashFlow.spending,
      0
    );
    const last = lastYearCashFlows.reduce(
      (acc, cashFlow) => acc + cashFlow.spending,
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
              {cashFlowMap[yearMonth]
                ? `- ${cashFlowMap[yearMonth].spending.toLocaleString()} 원`
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
              {`- ${cashFlows
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

export default Spending;
