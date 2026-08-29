"use client";

import { useState } from "react";
import Button from "./Button";

type CreateCounterButtonProps = {
  onClick: (name: string) => void;
};

export default function CreateCounterButton({
  onClick,
}: CreateCounterButtonProps) {
  return (
    <div>
      <Button
        className="rounded-xl w-full p-2 text-center justify-center text-black font-bold border border-black"
        onClick={onClick}
      >
        New Balance
      </Button>
    </div>
  );
}
