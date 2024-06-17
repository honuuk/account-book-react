import { useState } from "react";
import { PlusCircledIcon } from "@radix-ui/react-icons";

import { Button } from "~/components/ui/button";
import { CashFlowType, YearMonthString } from "~/types";
import { CashFlowService } from "~/service/cash-flow";
import { labelMap } from "./index";

import FormDialogContent from "~/components/form/FormDialogContent";
import NumberField from "~/components/form/NumberField";

interface FormValues {
  amount: number;
}

interface Props {
  type: CashFlowType;
  yearMonth: YearMonthString;
  cashFlowService: CashFlowService;
}

export default function Edit({ type, yearMonth, cashFlowService }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const typeLabel = labelMap[type];
  const action = cashFlowService.getCurrentMonthValue(type, yearMonth)
    ? "수정"
    : "추가";

  const save = async ({ amount }: FormValues) => {
    if (action === "수정") {
      await cashFlowService.update(yearMonth, type, amount);
    } else {
      await cashFlowService.create(yearMonth, type, amount);
    }
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <PlusCircledIcon className="mr-2 h-4 w-4" />
        {action}
      </Button>
      <FormDialogContent
        opened={isOpen}
        onSubmit={save}
        close={() => setIsOpen(false)}
        title={`${typeLabel} ${action}하기`}
        description={`${yearMonth}의 ${typeLabel}로 저장됩니다.`}
        initialValues={{
          amount: cashFlowService.getCurrentMonthValue(type, yearMonth) || 0,
        }}
      >
        {(form) => (
          <NumberField form={form} label={`${typeLabel} 금액`} name="amount" />
        )}
      </FormDialogContent>
    </>
  );
}
