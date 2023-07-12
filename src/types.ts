export type SpendingCategory =
  | "living"
  | "eat out"
  | "family"
  | "friend"
  | "transport"
  | "health"
  | "etc";
export type SpendingType = "card" | "cash" | "welfare";

export interface Record {
  title: string;
  category: SpendingCategory;
  type: SpendingType;
  price: number;
  description: string;
}
