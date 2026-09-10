import { OrgPanelType } from "../types/OrgPanel";
import { organisations } from "@/public/assets/organisations";
import Button from "../Button";

export default function OrgPanel({ orgs, removeOrg }: OrgPanelType) {
  return (
    <div className="min-h-150">
      <div className="grid grid-cols-2 grid-flow gap-5 px-3">
        {orgs.map((name, index) => (
          <div
            key={index}
            className="flex flex-col w-full h-20 bg-white rounded-2xl items-center justify-between shadow-xl"
          >
            <div className="flex justify-between w-full pl-5">
              <div>
                <h1 className="text-black font-bold pt-1">{name}</h1>
              </div>

              <Button
                onClick={() => removeOrg(name)}
                className="h-5 w-10 bg-red-500 rounded-tr-xl rounded-bl-xl"
              ></Button>
            </div>
            <div className="flex p-5 w-full">
              <div className="flex w-full justify-between px-5">
                <span className="text-red-500 text-[20px]">
                  {organisations[name].price}
                </span>
                <span className="text-green-500 text-[20px]">
                  {organisations[name].profit}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
