import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { CashFlow, CashFlowTab, YearMonthString } from "~/types";

import MonthPicker from "./MonthPicker";
import Edit from "./Edit";
import Income from "./Income";
import Saving from "./Saving";
import Spending from "./Spending";

const labelMap: Record<CashFlowTab, string> = {
  spending: "지출",
  income: "소득",
  saving: "저축",
};

interface Props {
  yearMonth: YearMonthString;
  cashFlows: CashFlow[];
  lastYearCashFlows: CashFlow[];
}

const CashFlowPage: React.FC<Props> = ({ yearMonth, ...data }) => {
  const [tab, setTab] = useState<string>("spending");
  const navigate = useNavigate();

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 max-w-4xl w-4/5 mx-auto">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Cash Flow</h2>
        <MonthPicker
          currentYearMonth={yearMonth}
          onYearMonthChange={(date) => navigate(`/cashFlow?date=${date}`)}
        />
      </div>
      <div className="space-between flex items-center">
        <Tabs value={tab} onValueChange={setTab} className="space-y-4">
          <TabsList>
            {["spending", "income", "saving"].map((value) => (
              <TabsTrigger key={value} value={value}>
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
    </div>
  );
};

export default CashFlowPage;
