import { ProfitProcessingModalType } from "../types/ProfitProcessingModal";
import Button from "../Button";

export default function ProfitProcessingModal({
  onClose,
  income,
  outcome,
}: ProfitProcessingModalType) {
  return (
    <div className="fixed inset-0 px-15 py-85 bg-black/50">
      <div className="flex flex-col bg-white shadow-xl rounded-xl w-full h-full">
        <div className="flex justify-between">
          <div></div>
          <div className="flex w-10 h-10 rounded-tr-xl rounded-bl-xl bg-red-500 justify-center">
            <Button
              className="flex font-bold text-4xl text-black justify-center"
              onClick={onClose}
            >
              x
            </Button>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <span className="flex text-[20px] font-bold text-green-500 justify-center text-shadow-xs">
            Income: {income}
          </span>
          <span className="flex text-[20px] font-bold text-red-500 justify-center text-shadow-xs">
            Outcome: {outcome}
          </span>
          {income - outcome >= 0 && (
            <span className="flex text-[20px] font-bold text-green-500 justify-center text-shadow-xs">
              Profit: {income - outcome}
            </span>
          )}
          {income - outcome < 0 && (
            <span className="flex text-[20px] font-bold text-red-500 justify-center text-shadow-xs">
              Profit: {income - outcome}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
