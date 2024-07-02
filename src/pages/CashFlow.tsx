import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import type { CashFlow, YearMonthString } from "~/types";
import { getLastMonth, getYearMonth, parseYear, subYear } from "~/utils/date";
import cashFlowApi from "~/service/cash-flow";

import Fetcher from "~/components/common/Fetcher";
import CashFlowPage from "~/components/page/cash-flow";

const CashFlow = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const yearMonth = searchParams.get("date") as YearMonthString | null;

  useEffect(() => {
    if (yearMonth) return;

    navigate(`/?date=${getLastMonth(getYearMonth(new Date()))}`);
  }, [yearMonth]);

  if (!yearMonth) return null;

  return (
    <Fetcher
      fetcher={async () => ({
        currentMonth: await cashFlowApi.getByYearMonth(yearMonth),
        lastMonth: await cashFlowApi.getByYearMonth(getLastMonth(yearMonth)),
        currentYear: await cashFlowApi.getAllByYear(parseYear(yearMonth)),
        lastYear: await cashFlowApi.getAllByYear(subYear(parseYear(yearMonth))),
      })}
    >
      {(data) => <CashFlowPage {...data} yearMonth={yearMonth} />}
    </Fetcher>
  );
};

export default CashFlow;
