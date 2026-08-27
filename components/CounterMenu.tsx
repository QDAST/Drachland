import Counter from "@/components/Counter";
import CreateCounterButton from "@/components/CreateCounterButton";
import { useState } from "react";

export default function CounterMenu() {
  const [step, setStep] = useState(1);
  const [counters, setCounters] = useState<string[]>([]);
  const [name, setName] = useState("");

  const addNewCounter = () => {
    setCounters([...counters, name]);
    setName("");
  };

  return (
    <div className="flex flex-col bg-gray-400 w-full p-1 gap-3 rounded-xl">
      <h1 className="flex text-black font-bold justify-center">Balance Menu</h1>
      <div className="flex gap-3 items-center bg-gray-300 p-1 rounded-2xl border border-black">
        <h1 className="flex w-3/10 h-full bg-amber-300 border border-black text-black font-bold justify-center items-center rounded-xl">
          STEP
        </h1>
        <div className="flex  bg-gray-500 h-6 w-0.5 rounded-full"></div>
        <input
          type="number"
          value={step}
          onChange={(event) => setStep(Number(event.target.value))}
          placeholder="Step"
          className="bg-gray-800 rounded-xl border border-black w-full p-2 text-center justify-center text-white font-bold"
        />
      </div>

      <div className="flex content-center">
        <div className="flex flex-col gap-3 w-full">
          {counters.map((counterName, index) => (
            <Counter key={index} name={counterName} step={step} />
          ))}
        </div>
      </div>

      <CreateCounterButton onClick={addNewCounter}></CreateCounterButton>

      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Player Name"
        className="bg-gray-800 rounded-xl w-full p-2 text-center justify-center text-white font-bold border border-black"
      />
    </div>
  );
}
