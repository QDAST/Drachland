import Counter from "@/components/Counter";
import CreateCounterButton from "@/components/CreateCounterButton";
import { useEffect, useState } from "react";

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
  const [counters, setCounters] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [players, setPlayers] = useState<Player[]>([]);

  const addNewCounter = () => {
    setCounters([...counters, name]);
    setName("");
  };

  useEffect(() => {
    fetch("/api/player")
      .then((res) => res.json())
      .then((data) => setPlayers(data));
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

      <CreateCounterButton onClick={addNewCounter}></CreateCounterButton>

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
            />
          ))}
        </div>
      </div>
    </div>
  );
}
