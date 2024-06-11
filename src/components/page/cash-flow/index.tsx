import { useState } from "react";
import { useNavigate } from "react-router-dom";

import type { CashFlowType, YearMonthString } from "~/types";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { CashFlowService } from "~/service/cash-flow";

import MonthPicker from "./MonthPicker";
import Edit from "./Edit";
import Detail from "./Detail";

export const labelMap: Record<CashFlowType, string> = {
  spending: "지출",
  income: "소득",
  saving: "저축",
};

const TYPES: CashFlowType[] = ["spending", "income", "saving"];

interface Props {
  yearMonth: YearMonthString;
  cashFlowService: CashFlowService;
}

const CashFlowPage: React.FC<Props> = ({ yearMonth, cashFlowService }) => {
  const [type, setType] = useState<CashFlowType>("spending");
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
        <Tabs
          value={type}
          onValueChange={(value) => setType(value as CashFlowType)}
          className="space-y-4"
        >
          <TabsList>
            {TYPES.map((type) => (
              <TabsTrigger key={type} value={type}>
                {labelMap[type]}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        {type !== "saving" && (
          <div className="ml-auto">
            <Edit
              type={type}
              yearMonth={yearMonth}
              cashFlowService={cashFlowService}
            />
          </div>
        )}
      </div>
      <Detail
        type={type}
        yearMonth={yearMonth}
        cashFlowService={cashFlowService}
      />
    </div>
  );
};

export default CashFlowPage;
