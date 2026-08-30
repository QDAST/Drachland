import { ReactNode } from "react";

export type CreditType = {
  name?: ReactNode;
  summ?: number;
  onDelete?: () => void;
};
