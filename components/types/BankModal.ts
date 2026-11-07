import { Dispatch, SetStateAction } from 'react';
import { CreditOneType } from './CreditOne';
import { Player } from './Counter';

export type BankModalType = {
  onClose: () => void;
  credits: CreditOneType[];
  setCredits: Dispatch<SetStateAction<CreditOneType[]>>;
  players: Player[];
  setPlayers: Dispatch<SetStateAction<Player[]>>;
};
