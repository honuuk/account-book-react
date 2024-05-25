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

export default function Edit() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusCircledIcon className="mr-2 h-4 w-4" />
          추가
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>지출 추가하기</DialogTitle>
          <DialogDescription>2024년 5월의 지출로 저장됩니다.</DialogDescription>
        </DialogHeader>
        <div className="py-4 grid grid-cols-5 items-center gap-4">
          <Label htmlFor="price" className="text-right">
            지출 금액
          </Label>
          <Input id="name" className="col-span-4" />
        </div>
        <DialogFooter>
          <Button type="submit">저장</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
