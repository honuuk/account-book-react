import { useState } from "react";
import { useNavigate } from "react-router-dom";

import type { CashFlow, CashFlowType, YearMonthString } from "~/types";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";

import MonthPicker from "./MonthPicker";
import Edit from "./Edit";
import Detail from "./Detail";

const TYPES: CashFlowType[] = ["spending", "income", "saving"];
export const typeLabelMap: Record<CashFlowType, string> = {
  spending: "지출",
  income: "소득",
  saving: "저축",
};

interface Props {
  yearMonth: YearMonthString;
  currentMonth: CashFlow | undefined;
  lastMonth: CashFlow | undefined;
  currentYear: CashFlow[];
  lastYear: CashFlow[];
}

const CashFlowPage: React.FC<Props> = ({
  yearMonth,
  currentMonth,
  lastMonth,
  currentYear,
  lastYear,
}) => {
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
          className="space-y-4"
          onValueChange={(value) => setType(value as CashFlowType)}
        >
          <TabsList>
            {TYPES.map((type) => (
              <TabsTrigger key={type} value={type}>
                {typeLabelMap[type]}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        {type !== "saving" && (
          <div className="ml-auto">
            <Edit
              type={type}
              yearMonth={yearMonth}
              currentMonth={currentMonth}
            />
          </div>
        )}
      </div>
      <Detail
        type={type}
        currentMonth={currentMonth}
        lastMonth={lastMonth}
        currentYear={currentYear}
        lastYear={lastYear}
      />
    </div>
  );
};

export default CashFlowPage;
