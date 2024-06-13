import { DefaultValues, UseFormReturn, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodObject } from "zod";

import { Button } from "../ui/button";
import { Form } from "../ui/form";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface Props<T extends Record<string, any>> {
  title: string;
  description?: string;
  close: () => void;
  validateSchema?: ZodObject<T>;
  initialValues?: Partial<T>;
  onSubmit: (formValues: T) => Promise<void>;
  children: (form: UseFormReturn<T, any, undefined>) => React.ReactNode;
}

export default function FormDialogContent<
  FormValues extends Record<string, any>
>({
  title,
  description,
  close,
  validateSchema,
  initialValues,
  onSubmit,
  children,
}: Props<FormValues>) {
  const form = useForm<FormValues>({
    ...(validateSchema ? { resolver: zodResolver(validateSchema) } : {}),
    defaultValues: initialValues as DefaultValues<FormValues> | undefined,
  });
  const onFormSubmit = async (values: FormValues) => {
    try {
      await onSubmit(values);
      close();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
          {children(form)}
          <DialogFooter>
            <Button type="button" onClick={close}>
              취소
            </Button>
            <Button type="submit">저장</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Form>
  );
}
