import Counter from "@/components/Counter/Counter";
import CreateCounterButton from "@/components/Counter/CreateCounterButton";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Player } from "./types";
import {
  getPlayers,
  subscribeToPlayers,
  deletePlayer as apiDeletePlayer,
  createPlayer as apiCreatePlayer,
  updateBalance as apiUpdateBalance,
} from "./api";

export default function CounterMenu() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [players, setPlayers] = useState<Player[]>([]);

  const createPlayer = async (name: string) => {
    const data = await apiCreatePlayer();
    setPlayers((players) => [...players, data]);
  };

  const loadPlayers = async () => {
    try {
      const data = await getPlayers();
      setPlayers(data);
    } catch (error) {
      console.error("loadPlayers error:", error);
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
    setPlayers((players) =>
      players.map((player) =>
        player.id === playerId
          ? {
              ...player,
              balance: {
                ...player.balance,
                amount: newBalance,
              },
            }
          : player,
      ),
    );

    apiUpdateBalance(playerId, newBalance);
  };

  const deletePlayer = async (playerId: string) => {
    const player = players.find((player) => player.id === playerId);

    if (!player) return;

    const confirm = window.confirm(
      `Delete player "${player.name}" and his balance?`,
    );

    if (!confirm) return;

    try {
      await apiDeletePlayer(playerId);

      setPlayers((players) =>
        players.filter((player) => player.id !== playerId),
      );
    } catch (error) {
      console.error("player delete error:", error);
    }
  };

  return (
    <div className="flex flex-col bg-gray-400 w-full p-1 gap-3 rounded-xl">
      <h1 className="flex text-black font-bold justify-center">Balance Menu</h1>
      <div className="flex gap-3 items-center bg-gray-300 p-1 rounded-2xl border border-black">
        <h1 className="flex w-3/10 h-10 bg-amber-300 border border-black text-black font-bold justify-center items-center rounded-xl">
          STEP
        </h1>
        <div className="flex  bg-gray-500 h-6 w-0.5 rounded-full"></div>
        <input
          type="text"
          inputMode="numeric"
          value={step}
          onChange={(event) => {
            const value = event.target.value;
            if (!/^\d*$/.test(value)) return;
            setStep(Number(value) || 0);
          }}
          placeholder="Step"
          className="bg-gray-800 rounded-xl border border-black w-full p-2 text-center justify-center text-white font-bold"
        />
      </div>

      <CreateCounterButton
        onClick={() => {
          createPlayer(name);
        }}
      ></CreateCounterButton>

      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Player Name"
        className="bg-gray-800 rounded-xl w-full p-2 text-center justify-center text-white font-bold border border-black"
      />

      <div className="flex content-center">
        <div className="flex flex-col gap-3 w-full">
          {players.map((player) => (
            <Counter
              key={player.id}
              name={player.name}
              balance={player.balance.amount}
              step={step}
              onChange={(newBalance) => updateBalance(player.id, newBalance)}
              onDelete={() => deletePlayer(player.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
