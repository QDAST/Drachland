"use client";

import { useState } from "react";
import Button from "./Button";
import type { ReactNode } from "react";

type CounterProps = {
  children?: ReactNode;
  name?: string;
  step?: number;
};

export default function Counter({
  children,
  name = "",
  step = 1,
}: CounterProps) {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col gap-3 items-center bg-gray-500 p-5 rounded-xl border border-black">
      <span className="flex h-10 w-full bg-gray-100 text-10px text-black rounded-full justify-center items-center font-bold">
        {name.trim() !== "" ? name.toUpperCase() : "ANONIM"}
      </span>
      <div className="flex h-0.5 w-3/4 bg-gray-400 rounded-full"></div>
      <div className="flex w-10/10 content-center justify-between">
        <Button
          className="flex h-10 w-3/10 justify-center items-center text-3xl rounded-l-full"
          onClick={() => setCount(count - step)}
        >
          -
        </Button>
        <div className="flex w-4/10 items-center text-3xl pl-2 pr-2 bg-gray-600">
          {count}
        </div>
        <Button
          className="flex w-3/10 h-10 justify-center items-center text-3xl rounded-r-full"
          onClick={() => setCount(count + step)}
        >
          +
        </Button>
      </div>
    </div>
  );
}
