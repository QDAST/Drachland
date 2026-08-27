"use client";

import Image from "next/image";
import Button from "@/components/Button";
import CreditMenu from "@/components/CreditMenu";
import { useState } from "react";
import CounterMenu from "@/components/CounterMenu";

export default function Home() {
  return (
    <div className="flex flex-col bg-gray-300 min-h-screen h-full w-full p-2 gap-3">
      <div className="h-10"></div>
      <CounterMenu></CounterMenu>
      <CreditMenu></CreditMenu>
    </div>
  );
}
