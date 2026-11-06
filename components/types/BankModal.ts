import { Dispatch, SetStateAction } from 'react';

export type BankModalType = {
  onClose: () => void;
  credits: string[];
  setCredits: Dispatch<SetStateAction<string[]>>;
};
