import { ReactNode } from 'react';

export type CreditType = {
  name?: string;
  summ?: number;
  onDelete?: () => void;
};
