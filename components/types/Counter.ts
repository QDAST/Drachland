import { ReactNode } from "react";

export type Player = {
  id: string;
  name: string;
  balance: {
    id: string;
    amount: number;
  };
};

export type CounterProps = {
  children?: ReactNode;
  name?: string;
  step?: number;
  balance?: number;
  onChange?: (newBalance: number) => void;
  onDelete?: () => void;
};

export type CreateCounterButtonProps = {
  onClick: (name: string) => void;
};
