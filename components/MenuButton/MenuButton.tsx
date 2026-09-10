import Button from "../Button";
import { MenuButtonType } from "../types/MenuButton";

export default function MenuButton({ onClick }: MenuButtonType) {
  return (
    <div className="flex">
      <div className="flex bg-gray-200 rounded-full">
        <Button
          onClick={onClick}
          className="transition-all w-10 h-10 justify-center"
        >
          <div className="flex flex-col gap-1 items-center justify-center">
            <div className="flex bg-gray-500 h-0.75 w-5 rounded-full"></div>
            <div className="flex bg-gray-500 h-0.75 w-5 rounded-full"></div>
            <div className="flex bg-gray-500 h-0.75 w-5 rounded-full"></div>
          </div>
        </Button>
      </div>
    </div>
  );
}
