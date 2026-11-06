import { Dispatch, SetStateAction } from 'react';

export type CreditMenuType = {
  credits: string[];
  setCredits: Dispatch<SetStateAction<string[]>>;
};
