import CounterMenu from "../Counter/CounterMenu";
import CreditMenu from "../Credit/CreditMenu";
import Button from "../Button";
import { BankModalType } from "../types/BankModal";

export default function BankModal({ onClose }: BankModalType) {
  return (
    <div className="fixed inset-0 bg-black/50 p-5 pb-25">
      <div className="flex flex-col w-full h-full rounded-xl bg-white shadow-xl gap-3">
        <Button
          onClick={onClose}
          className="flex justify-center items-center w-full h-10 bg-red-500 rounded-t-xl text-black font-bold text-3xl"
        >
          Close Bank
        </Button>
        <div className="flex flex-col px-5 gap-3">
          <CounterMenu></CounterMenu>
          <CreditMenu></CreditMenu>
        </div>
      </div>
    </div>
  );
}
