import Counter from '@/components/Counter/Counter';
import CreateCounterButton from '@/components/Counter/CreateCounterButton';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Player } from '../types/Counter';
import {
  getPlayers,
  subscribeToPlayers,
  deletePlayer as apiDeletePlayer,
  createPlayer as apiCreatePlayer,
  updateBalance as apiUpdateBalance
} from './api';

export default function CounterMenu() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [players, setPlayers] = useState<Player[]>([]);

  const createPlayer = async (name: string) => {
    const data = await apiCreatePlayer(name);
    setPlayers(players => [...players, data]);
  };

  const loadPlayers = async () => {
    try {
      const data = await getPlayers();
      setPlayers(data);
    } catch (error) {
      console.error('loadPlayers error:', error);
    }
  };

  useEffect(() => {
    loadPlayers();

    const channel = subscribeToPlayers(() => {
      loadPlayers();
    });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const updateBalance = async (playerId: string, newBalance: number) => {
    setPlayers(players =>
      players.map(player =>
        player.id === playerId
          ? {
              ...player,
              balance: {
                ...player.balance,
                amount: newBalance
              }
            }
          : player
      )
    );

    apiUpdateBalance(playerId, newBalance);
  };

  const deletePlayer = async (playerId: string) => {
    const player = players.find(player => player.id === playerId);

    if (!player) return;

    const confirm = window.confirm(
      `Delete player "${player.name}" and his balance?`
    );

    if (!confirm) return;

    try {
      await apiDeletePlayer(playerId);

      setPlayers(players => players.filter(player => player.id !== playerId));
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
        <div className='flex h-6 w-0.5 rounded-full bg-gray-500'></div>
        <input
          type='text'
          inputMode='numeric'
          value={step}
          onChange={event => {
            const value = event.target.value;
            if (!/^\d*$/.test(value)) return;
            setStep(Number(value) || 0);
          }}
          placeholder='Step'
          className='w-full justify-center rounded-xl border border-black bg-gray-800 p-2 text-center font-bold text-white'
        />
      </div>

      <CreateCounterButton
        onClick={() => {
          createPlayer(name);
        }}
      ></CreateCounterButton>

      <input
        type='text'
        value={name}
        onChange={event => setName(event.target.value)}
        placeholder='Player Name'
        className='w-full justify-center rounded-xl border border-black bg-gray-800 p-2 text-center font-bold text-white'
      />

      <div className='flex content-center'>
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
    </div>
  );
}
