import { supabase } from "@/lib/supabase";

export const getPlayers = async () => {
  const response = await fetch("/api/player");

  if (!response.ok) {
    throw new Error("getPlayers Error");
  }

  return response.json();
};

export const deletePlayer = async (playerId: string): Promise<void> => {
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
};

export function subscribeToPlayers(onChange: () => void) {
  const channel = supabase
    .channel("players-realtime")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "Player",
      },
      () => {
        onChange();
      },
    )
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "Balance",
      },
      () => {
        onChange();
      },
    )
    .subscribe();

  return channel;
}

export const createPlayer = async () => {
  const response = await fetch("/api/player", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
    }),
  });

  return await response.json();
};

export const updateBalance = async (playerId: string, newBalance: number) => {
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
