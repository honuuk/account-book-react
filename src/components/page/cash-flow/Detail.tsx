import type { CashFlowType, CashFlow } from "~/types";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

import AnnualTrend from "./AnnualTrend";
import { typeLabelMap } from ".";

interface Props {
  type: CashFlowType;
  currentMonth: CashFlow | undefined;
  lastMonth: CashFlow | undefined;
  currentYear: CashFlow[];
  lastYear: CashFlow[];
}

const Detail: React.FC<Props> = ({
  type,
  currentMonth,
  lastMonth,
  currentYear,
  lastYear,
}) => {
  const currentMonthAmount = getCurrentMonthAmount(type, currentMonth);
  const currentYearAmount = getCurrentYearAmount(type, currentYear);
  const MoM = getMoM(type, currentMonth, lastMonth);
  const YoY = getYoY(type, currentYear, lastYear);

  const formatAmount = (amount?: number) => {
    return amount ? `${amount.toLocaleString()}원` : "-";
  };

  const formatRate = (value: number, unit: "month" | "year") => {
    if (value >= 0) return `+${value.toFixed(2)}% from last ${unit}`;
    return `${value.toFixed(2)}% from last ${unit}`;
  };

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              이번 달 {typeLabelMap[type]}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatAmount(currentMonthAmount)}
            </div>
            {MoM !== undefined && (
              <p className="pt-1 text-xs text-muted-foreground">
                {formatRate(MoM, "month")}
              </p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              올해 총 {typeLabelMap[type]}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatAmount(currentYearAmount)}
            </div>
            {YoY !== undefined && (
              <p className="pt-1 text-xs text-muted-foreground">
                {formatRate(YoY, "year")}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle>월별 {typeLabelMap[type]}</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <AnnualTrend type={type} currentYear={currentYear} />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Detail;

const getCurrentMonthAmount = (type: CashFlowType, currentMonth?: CashFlow) => {
  if (!currentMonth) return;
  return (() => {
    switch (type) {
      case "spending":
        return currentMonth.spending && -currentMonth.spending;
      case "income":
        return currentMonth.income;
      case "saving":
        return currentMonth.income && currentMonth.spending
          ? currentMonth.income - currentMonth.spending
          : undefined;
    }
  })();
};

const getCurrentYearAmount = (type: CashFlowType, currentYear: CashFlow[]) => {
  return (() => {
    switch (type) {
      case "spending":
        return currentYear.reduce(
          (acc, { spending }) => acc - (spending || 0),
          0
        );
      case "income":
        return currentYear.reduce((acc, { income }) => acc + (income || 0), 0);
      case "saving":
        return currentYear
          .filter(({ income, spending }) => income && spending)
          .reduce(
            (acc, { income, spending }) => acc + (income! - spending!),
            0
          );
      default:
        return;
    }
  })();
};

const getMoM = (type: CashFlowType, current?: CashFlow, last?: CashFlow) => {
  if (!current || !last) return;

  const MoM = (() => {
    switch (type) {
      case "spending": {
        if (!current.spending || !last.spending) return;
        return ((current.spending - last.spending) / last.spending) * 100;
      }
      case "income": {
        if (!current.income || !last.income) return;
        return ((current.income - last.income) / last.income) * 100;
      }
      case "saving": {
        if (!current.spending || !last.spending) return;
        if (!current.income || !last.income) return;

        const currentSaving = current.income - current.spending;
        const lastSaving = last.income - last.spending;
        return ((currentSaving - lastSaving) / lastSaving) * 100;
      }
      default:
        return;
    }
  })();

  return MoM;
};

const getYoY = (
  type: CashFlowType,
  currentYear: CashFlow[],
  lastYear: CashFlow[]
) => {
  const [current, last] = (() => {
    switch (type) {
      case "spending":
        return [
          currentYear.reduce((acc, { spending }) => acc + (spending || 0), 0),
          lastYear.reduce((acc, { spending }) => acc + (spending || 0), 0),
        ];
      case "income":
        return [
          currentYear.reduce((acc, { income }) => acc + (income || 0), 0),
          lastYear.reduce((acc, { income }) => acc + (income || 0), 0),
        ];
      case "saving":
        return [
          currentYear
            .filter(({ income, spending }) => income && spending)
            .reduce(
              (acc, { income, spending }) => acc + (income! - spending!),
              0
            ),
          lastYear
            .filter(({ income, spending }) => income && spending)
            .reduce(
              (acc, { income, spending }) => acc + (income! - spending!),
              0
            ),
        ];
      default:
        return [];
    }
  })();

  if (!current || !last) return;
  return ((current - last) / last) * 100;
};
