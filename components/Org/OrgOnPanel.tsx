import Button from "../Button";
import { OrgOnPanelType } from "../types/OrgOnPanel";
import { OrganisationName } from "@/public/assets/organisations";
import { useState } from "react";
import { organisations } from "@/public/assets/organisations";

export default function OrgOnPanel({
  closeOrg,
  openOrg,
  removeOrg,
  name,
}: OrgOnPanelType) {
  const [isOpened, setIsOpened] = useState(true);
  const onClick = (name: OrganisationName) => {
    if (isOpened) {
      closeOrg(name);
    } else {
      openOrg(name);
    }
    setIsOpened(!isOpened);
  };
  return (
    <div
      className={`flex flex-col w-full h-20 rounded-2xl items-center justify-between shadow-xl ${!isOpened ? "bg-gray-200" : "bg-white"}`}
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
      <div className="flex w-full">
        <div className="flex w-full justify-between pl-3">
          <span className="text-red-500 text-[20px]">
            {organisations[name].price}
          </span>
          <span className="text-green-500 text-[20px]">
            {organisations[name].profit}
          </span>
          <div className="flex flex-col justify-between">
            <div></div>
            <Button
              className="flex h-5 w-10 bg-gray-500 rounded-tl-xl rounded-br-xl"
              onClick={() => onClick(name)}
            ></Button>
          </div>
        </div>
      </div>
    </div>
  );
}
