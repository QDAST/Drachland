import { useState } from "react";
import Button from "./Button";
import Credit from "./Credit";

export default function CreditMenu() {
  const [credits, setCredits] = useState<string[]>([]);
  const [summ, setSumm] = useState(0);
  const [name, setName] = useState("");

  const addNewCredit = () => {
    setCredits([...credits, name]);
    setName("");
  };
  const deleteCredit = (index: number) => {
    setCredits((prev) => prev.filter((_, i) => i !== index));
  };
  return (
    <div className="flex flex-col gap-3 bg-gray-400 p-1 rounded-xl">
      <h1 className="flex text-black font-bold justify-center">Credit Menu</h1>
      <div className="flex flex-col gap-3">
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Name"
          className="bg-gray-800 rounded-xl w-full p-2 text-center justify-center text-white font-bold"
        />
        <input
          type="text"
          inputMode="numeric"
          value={summ}
          onChange={(event) => {
            const value = event.target.value;
            if (!/^\d*$/.test(value)) return;
            setSumm(Number(value) || 0);
          }}
          placeholder="Summ"
          className="bg-gray-800 rounded-xl w-full p-2 text-center justify-center text-white font-bold"
        />
        <Button
          className="rounded-xl w-full h-10 p-2 text-center justify-center text-black font-bold border border-black"
          onClick={addNewCredit}
        >
          New Credit
        </Button>
      </div>
      {credits.map((creditName, index) => (
        <Credit
          name={creditName}
          summ={summ}
          onDelete={() => deleteCredit(index)}
          key={index}
        ></Credit>
      ))}
    </div>
  );
}
