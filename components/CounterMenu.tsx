import Counter from "@/components/Counter";
import CreateCounterButton from "@/components/CreateCounterButton";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Player = {
  id: string;
  name: string;
  balance: {
    id: string;
    amount: number;
  };
};

export default function CounterMenu() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [players, setPlayers] = useState<Player[]>([]);
  async function addNewCounter(name: string) {
    const response = await fetch("/api/player", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
      }),
    });

    const data = await response.json();
    setPlayers((players) => [...players, data]);
  }

  const loadPlayers = async () => {
    try {
      const response = await fetch("/api/player");

      if (!response.ok) {
        console.error("Failed to load players:", response.status);
        return;
      }

      const data = await response.json();
      setPlayers(data);
    } catch (error) {
      console.error("loadPlayers error:", error);
    }
  };

  useEffect(() => {
    loadPlayers();

    const channel = supabase
      .channel("players-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "Player",
        },
        (payload) => {
          console.log("Realtime Player:", payload);
          loadPlayers();
        },
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "Balance",
        },
        (payload) => {
          console.log("Realtime Balance:", payload);
          loadPlayers();
        },
      )
      .subscribe((status) => {
        console.log("Realtime status:", status);
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

    await fetch("/api/balance", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        playerId: playerId,
        amount: newBalance,
      }),
    });
  };

  const deletePlayer = async (playerId: string) => {
    const player = players.find((player) => player.id === playerId);

    if (!player) return;

    const confirm = window.confirm(
      `Delete player "${player.name}" and his balance?`,
    );

    if (!confirm) return;

    const response = await fetch("/api/player", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        playerId,
      }),
    });

    if (!response.ok) {
      console.error("Player delete error");
      return;
    }

    setPlayers((players) => players.filter((player) => player.id !== playerId));
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
          addNewCounter(name);
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
