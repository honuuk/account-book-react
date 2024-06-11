import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import type { CashFlow, YearMonthString } from "~/types";
import { getYearMonth, parseYear, subYear } from "~/utils/date";
import cashFlow from "~/service/cash-flow";

import Fetcher from "~/components/common/Fetcher";
import CashFlowPage from "~/components/page/cash-flow";

const CashFlow = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const yearMonth = searchParams.get("date") as YearMonthString | null;

  useEffect(() => {
    if (yearMonth) return;

    navigate(`/cashFlow?date=${getYearMonth(new Date())}`);
  }, []);

  if (!yearMonth) return null;

  return (
    <Fetcher
      fetcher={async () => {
        const cashFlows = await cashFlow.findAllByYear(parseYear(yearMonth));
        const lastYearCashFlows = await cashFlow.findAllByYear(
          subYear(parseYear(yearMonth))
        );
        return { cashFlows, lastYearCashFlows };
      }}
    >
      {(data) => <CashFlowPage {...data} yearMonth={yearMonth} />}
    </Fetcher>
  );
};

export default CashFlow;
