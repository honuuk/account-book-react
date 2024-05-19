import { PlusCircledIcon } from "@radix-ui/react-icons";
import { useState } from "react";

import MonthPicker from "~/components/page/spending/MonthPicker";
import { PortionChart } from "~/components/page/spending/PortionChart";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { YearMonthString } from "~/types";
import { getYearMonth } from "~/utils/date";

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
      <div className="space-between flex items-center">
        <Tabs value={tab} onValueChange={setTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="spending">지출</TabsTrigger>
            <TabsTrigger value="income">소득</TabsTrigger>
            <TabsTrigger value="save">저축</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="ml-auto">
          <Button>
            <PlusCircledIcon className="mr-2 h-4 w-4" />
            추가
          </Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
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
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
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
