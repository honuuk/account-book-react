import { useState } from "react";

import { getYearMonth, parseYear, subYear } from "~/utils/date";
import type { CashFlow, YearMonthString, CashFlowTab } from "~/types";

import cashFlow from "~/service/cash-flow";

import MonthPicker from "~/components/page/cash-flow/MonthPicker";
import Fetcher from "~/components/common/Fetcher";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import Edit from "~/components/page/cash-flow/Edit";
import Spending from "~/components/page/cash-flow/Spending";
import Income from "~/components/page/cash-flow/Income";
import Saving from "~/components/page/cash-flow/Saving";

interface Props {}

const CashFlow: React.FC<Props> = () => {
  const [tab, setTab] = useState<string>("spending");
  const [yearMonth, setYearMonth] = useState<YearMonthString>(
    getYearMonth(new Date())
  );

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 max-w-4xl w-4/5 mx-auto">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Cash Flow</h2>
        <MonthPicker
          currentYearMonth={yearMonth}
          onYearMonthChange={setYearMonth}
        />
      </div>
      <Fetcher
        fetcher={async () => {
          const cashFlows = await cashFlow.findAllByYear(parseYear(yearMonth));
          const lastYearCashFlows = await cashFlow.findAllByYear(
            subYear(parseYear(yearMonth))
          );
          return { cashFlows, lastYearCashFlows };
        }}
      >
        {(data) => (
          <>
            <div className="space-between flex items-center">
              <Tabs value={tab} onValueChange={setTab} className="space-y-4">
                <TabsList>
                  {["spending", "income", "saving"].map((value) => (
                    <TabsTrigger value={value}>
                      {labelMap[value as CashFlowTab]}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
              <div className="ml-auto">
                <Edit />
              </div>
            </div>
            {tab === "spending" && <Spending {...data} yearMonth={yearMonth} />}
            {tab === "income" && <Income {...data} yearMonth={yearMonth} />}
            {tab === "saving" && <Saving {...data} yearMonth={yearMonth} />}
          </>
        )}
      </Fetcher>
    </div>
  );
};

export default CashFlow;

const labelMap: Record<CashFlowTab, string> = {
  spending: "지출",
  income: "소득",
  saving: "저축",
};
