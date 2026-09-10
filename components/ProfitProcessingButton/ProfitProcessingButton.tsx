import Button from "../Button";
import { ProfitProcessingButtonType } from "../types/ProfitProcessingButton";

export default function ProfitProcessingButton({
  onClick,
}: ProfitProcessingButtonType) {
  return (
    <div className="flex">
      <Button
        onClick={onClick}
        className="transition-all hover:bg-gray-200 justify-center w-15 h-15 bg-[#2196F3] rounded-full items-center"
      >
        <div className="w-10 h-10 bg-radial from-[#1970B7] to-blue-800 rounded-xl"></div>
      </Button>
    </div>
  );
}
