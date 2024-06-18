import { useState } from "react";
import { PlusCircledIcon } from "@radix-ui/react-icons";

import { CashFlow, CashFlowType, YearMonthString } from "~/types";
import cashFlowApi from "~/service/cash-flow";

import FormDialogContent from "~/components/form/FormDialogContent";
import NumberField from "~/components/form/NumberField";
import { Button } from "~/components/ui/button";
import { typeLabelMap } from ".";

interface FormValues {
  amount: number;
}

interface Props {
  type: Exclude<CashFlowType, "saving">;
  yearMonth: YearMonthString;
  currentMonth: CashFlow | undefined;
}

export default function Edit({ type, yearMonth, currentMonth }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const typeLabel = typeLabelMap[type];
  const action = currentMonth && currentMonth[type] ? "수정" : "추가";

  const save = async ({ amount }: FormValues) => {
    if (!currentMonth) {
      await cashFlowApi.create(type, yearMonth, amount);
    } else {
      await cashFlowApi.update(type, currentMonth, amount);
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
          amount: (currentMonth && currentMonth[type]) || 0,
        }}
      >
        {(form) => (
          <NumberField form={form} label={`${typeLabel} 금액`} name="amount" />
        )}
      </FormDialogContent>
    </>
  );
}
