import { useState } from "react";

import MonthPicker from "~/components/page/spending/MonthPicker";
import { PortionChart } from "~/components/page/spending/PortionChart";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { YearMonthString } from "~/types";
import { getYearMonth } from "~/utils/date";

interface Props {}

const Spending: React.FC<Props> = () => {
  const [yearMonth, setYearMonth] = useState<YearMonthString>(
    getYearMonth(new Date())
  );

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">소득 · 지출</h2>
        <MonthPicker
          currentYearMonth={yearMonth}
          onYearMonthChange={setYearMonth}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              이번 달 총 소득
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+ 5,445,231 원</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">올해 총 소득</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+ 5,445,231 원</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              이번 달 총 지출
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">- 45,231 원</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">올해 총 지출</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">- 45,231 원</div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>소득</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <PortionChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>지출</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <PortionChart />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Spending;
