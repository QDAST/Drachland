import { BankPanelType } from "../types/BankPanel";
import Button from "../Button";

export default function BankPanel({ onOpen }: BankPanelType) {
  return (
    <div className="flex w-full h-10 px-5">
      <div className="flex w-full h-full rounded-xl bg-white shadow-xl">
        <Button
          className="flex w-full text-black font-bold text-3xl justify-center items-center"
          onClick={onOpen}
        >
          Open Bank
        </Button>
      </div>
    </div>
  );
}
