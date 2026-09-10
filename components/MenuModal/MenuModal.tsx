import { MenuButtonType } from "../types/MenuButton";
import Button from "../Button";
import { MenuModalType } from "../types/MenuModal";

export default function MenuModal({ onClose }: MenuModalType) {
  return (
    <div className="fixed inset-0 p-5">
      <div className="flex w-full h-30 rounded-xl bg-white shadow-2xl">
        <div className="flex w-full justify-between">
          <div></div>
          <div className="flex w-10 h-10 bg-red-500 rounded-tr-xl rounded-bl-xl">
            <Button
              onClick={onClose}
              className="flex w-full font-bold text-4xl text-black items-center justify-center"
            >
              x
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
