import type { YearMonthString, CashFlowType } from "~/types";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { CashFlowService } from "~/service/cash-flow";

import AnnualTrend from "./AnnualTrend";

interface Props {
  type: CashFlowType;
  cashFlowService: CashFlowService;
  yearMonth: YearMonthString;
}

const Detail: React.FC<Props> = ({ type, cashFlowService, yearMonth }) => {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {cashFlowService.getCurrentMonthLabel(type)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {cashFlowService.getCurrentMonth(type, yearMonth)}
            </div>
            <p className="text-xs text-muted-foreground">
              {cashFlowService.getMoM(type, yearMonth)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {cashFlowService.getCurrentYearLabel(type)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {cashFlowService.getCurrentYear(type)}
            </div>
            <p className="text-xs text-muted-foreground">
              {cashFlowService.getYoY(type)}
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle>{cashFlowService.getAnnualTrendLabel(type)}</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <AnnualTrend type={type} cashFlowService={cashFlowService} />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Detail;
