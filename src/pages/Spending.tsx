import { useState } from "react";

import { getYearMonth, parseYear, subYear } from "~/utils/date";
import type { Spending, YearMonthString, SpendingTab } from "~/types";

import { spending } from "~/service/spending";

import MonthPicker from "~/components/page/spending/MonthPicker";
import Fetcher from "~/components/common/Fetcher";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import Edit from "~/components/page/spending/Edit";
import SpendingPage from "~/components/page/spending/SpendingPage";
import Income from "~/components/page/spending/Income";
import Saving from "~/components/page/spending/Saving";

interface Props {}

const Spending: React.FC<Props> = () => {
  const [tab, setTab] = useState<string>("spending");
  const [yearMonth, setYearMonth] = useState<YearMonthString>(
    getYearMonth(new Date())
  );

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 max-w-4xl w-4/5 mx-auto">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Spending</h2>
        <MonthPicker
          currentYearMonth={yearMonth}
          onYearMonthChange={setYearMonth}
        />
      </div>
      <Fetcher
        fetcher={async () => {
          const spendings = await spending.findAllByYear(parseYear(yearMonth));
          const lastYearSpendings = await spending.findAllByYear(
            subYear(parseYear(yearMonth))
          );
          return { spendings, lastYearSpendings };
        }}
      >
        {(data) => (
          <>
            <div className="space-between flex items-center">
              <Tabs value={tab} onValueChange={setTab} className="space-y-4">
                <TabsList>
                  {["spending", "income", "saving"].map((value) => (
                    <TabsTrigger value={value}>
                      {labelMap[value as SpendingTab]}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
              <div className="ml-auto">
                <Edit />
              </div>
            </div>
            {tab === "spending" && (
              <SpendingPage {...data} yearMonth={yearMonth} />
            )}
            {tab === "income" && <Income {...data} yearMonth={yearMonth} />}
            {tab === "saving" && <Saving {...data} yearMonth={yearMonth} />}
          </>
        )}
      </Fetcher>
    </div>
  );
};

export default Spending;

const labelMap: Record<SpendingTab, string> = {
  spending: "지출",
  income: "소득",
  saving: "저축",
};
