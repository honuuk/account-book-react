import { useState } from "react";
import { PlusCircledIcon } from "@radix-ui/react-icons";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { CashFlowType, YearMonthString } from "~/types";
import { CashFlowService } from "~/service/cash-flow";

import { labelMap } from "./index";

interface Props {
  type: CashFlowType;
  yearMonth: YearMonthString;
  cashFlowService: CashFlowService;
}

export default function Edit({ type, yearMonth, cashFlowService }: Props) {
  const [amount, setAmount] = useState<number | undefined>(
    cashFlowService.getCurrentMonthValue(type, yearMonth)
  );

  const typeLabel = labelMap[type];
  const action = cashFlowService.getCurrentMonthValue(type, yearMonth)
    ? "수정"
    : "추가";

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value.replaceAll(",", ""));
    if (Number.isNaN(value)) return;
    setAmount(value);
  };

  const save = async () => {
    if (action !== "수정" || !amount) return;
    await cashFlowService.update(yearMonth, type, amount);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusCircledIcon className="mr-2 h-4 w-4" />
          {action}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {typeLabel} {action}하기
          </DialogTitle>
          <DialogDescription>
            {yearMonth}의 {typeLabel}로 저장됩니다.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 grid grid-cols-9 items-center gap-4">
          <Label htmlFor="price" className="text-left col-span-2">
            {typeLabel} 금액
          </Label>
          <Input
            id="price"
            value={(amount || "").toLocaleString()}
            onChange={handleAmountChange}
            className="col-span-6"
          />
          <div className="col-span-1">원</div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={save}>
            저장
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
