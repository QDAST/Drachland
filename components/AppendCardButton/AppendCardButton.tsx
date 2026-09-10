import Button from "../Button";
import { AppendCardButtonType } from "../types/AppendCardButton";

export default function AppendCardButton({ onClick }: AppendCardButtonType) {
  return (
    <div className="flex justify-center items-center w-10 h-10">
      <div className="flex w-full h-full justify-center items-center bg-gray-200 rounded-full">
        <Button
          onClick={onClick}
          className="flex transition-al text-gray-500 text-[40px] hover:bg-gray-200"
        >
          +
        </Button>
      </div>
    </div>
  );
}
