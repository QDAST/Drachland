import Counter from '@/components/Counter/Counter';
import CreateCounterButton from '@/components/Counter/CreateCounterButton';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { CounterMenuType } from '../types/CounterMenu';
import {
  getPlayers,
  subscribeToPlayers,
  deletePlayer as apiDeletePlayer,
  createPlayer as apiCreatePlayer,
  updateBalance as apiUpdateBalance
} from './api';

export default function CounterMenu({
  players = [],
  setPlayers
}: CounterMenuType) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');

  const loadPlayers = async () => {
    try {
      const data = await getPlayers();
      setPlayers(data ?? []);
    } catch (error) {
      console.error('loadPlayers error:', error);
    }
  };

  const createPlayer = async () => {
    const trimmed = name.trim();
    if (!trimmed) return;

    try {
      const data = await apiCreatePlayer(trimmed);
      setPlayers(prev => [...prev, data]);
      setName('');
    } catch (error) {
      console.error('createPlayer error:', error);
    }
  };

  const updateBalance = async (playerId: string, newBalance: number) => {
    setPlayers(prev =>
      prev.map(player =>
        player.id === playerId
          ? { ...player, balance: { ...player.balance, amount: newBalance } }
          : player
      )
    );

    try {
      await apiUpdateBalance(playerId, newBalance);
    } catch (error) {
      console.error('updateBalance error:', error);
    }
  };

  const deletePlayer = async (playerId: string) => {
    const player = players.find(p => p.id === playerId);
    if (!player) return;

    if (!window.confirm(`Delete player "${player.name}" and his balance?`))
      return;

    try {
      await apiDeletePlayer(playerId);
      setPlayers(prev => prev.filter(p => p.id !== playerId));
    } catch (error) {
      console.error('player delete error:', error);
    }
  };

  return (
    <div className='flex w-full flex-col gap-3 rounded-xl bg-gray-400 p-1'>
      <h1 className='flex justify-center font-bold text-black'>Balance Menu</h1>

      <div className='flex items-center gap-3 rounded-2xl border border-black bg-gray-300 p-1'>
        <h1 className='flex h-10 w-3/10 items-center justify-center rounded-xl border border-black bg-amber-300 font-bold text-black'>
          STEP
        </h1>
        <div className='h-6 w-0.5 rounded-full bg-gray-500' />
        <input
          type='text'
          inputMode='numeric'
          value={step}
          onChange={event => {
            const value = event.target.value;
            if (!/^\d*$/.test(value)) return;
            const parsed = parseInt(value, 10);
            setStep(Number.isNaN(parsed) ? 0 : parsed);
          }}
          placeholder='Step'
          className='w-full rounded-xl border border-black bg-gray-800 p-2 text-center font-bold text-white'
        />
      </div>

      <input
        type='text'
        value={name}
        onChange={event => setName(event.target.value)}
        onKeyDown={event => {
          if (event.key === 'Enter') createPlayer();
        }}
        placeholder='Player Name'
        className='w-full rounded-xl border border-black bg-gray-800 p-2 text-center font-bold text-white'
      />

      <CreateCounterButton onClick={createPlayer} />

      <div className='flex w-full flex-col gap-3'>
        {players.map(player => (
          <Counter
            key={player.id}
            name={player.name}
            balance={player.balance.amount}
            step={step}
            onChange={newBalance => updateBalance(player.id, newBalance)}
            onDelete={() => deletePlayer(player.id)}
          />
        ))}
      </div>
    </div>
  );
}
