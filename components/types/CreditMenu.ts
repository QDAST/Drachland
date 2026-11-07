import { Dispatch, SetStateAction } from 'react';
import { CreditOneType } from './CreditOne';

export type CreditMenuType = {
  credits: CreditOneType[];
  setCredits: Dispatch<SetStateAction<CreditOneType[]>>;
};
