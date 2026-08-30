"use client";

import Button from "../Button";
import { CounterProps } from "./types";

export default function Counter({
  children,
  name = "",
  step = 1,
  balance = 0,
  onChange,
  onDelete,
}: CounterProps) {
  return (
    <div className="flex flex-col gap-3 items-center bg-gray-500 p-5 rounded-xl border border-black">
      <div className="flex w-full gap-3">
        <span className="flex h-10 w-full bg-gray-100 text-10px text-black rounded-full justify-center items-center font-bold">
          {name.trim() !== "" ? name.toUpperCase() : "ANONIM"}
        </span>
        <Button
          onClick={onDelete}
          className="flex w-12 rounded-full bg-red-600"
        ></Button>
      </div>

      <div className="flex h-0.5 w-3/4 bg-gray-400 rounded-full"></div>
      <div className="flex w-10/10 content-center justify-between">
        <Button
          className="flex h-10 w-3/10 justify-center items-center text-3xl rounded-l-full"
          onClick={() => onChange?.(balance! - step)}
        >
          -
        </Button>
        <div className="flex w-4/10 items-center text-3xl pl-2 pr-2 bg-gray-600">
          {balance}
        </div>
        <Button
          className="flex w-3/10 h-10 justify-center items-center text-3xl rounded-r-full"
          onClick={() => onChange?.(balance! + step)}
        >
          +
        </Button>
      </div>
    </div>
  );
}
