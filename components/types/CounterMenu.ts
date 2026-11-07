import { Dispatch, SetStateAction } from 'react';
import { Player } from '@/components/types/Counter';

export type CounterMenuType = {
  players: Player[];
  setPlayers: Dispatch<SetStateAction<Player[]>>;
};
