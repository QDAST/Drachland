import { AppendCardModalType } from "../types/AppendCardModal";
import Button from "../Button";
import { OrganisationName, organisations } from "@/public/assets/organisations";
import { useState, useRef } from "react";

export default function AppendCardModal({
  onClose,
  addOrg,
}: AppendCardModalType) {
  const organisationNames: OrganisationName[] = (
    Object.keys(organisations) as OrganisationName[]
  ).sort();
  const [selectedOrganisation, setSelectedOrganisation] =
    useState<OrganisationName>(organisationNames[0]);
  const pickerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const picker = pickerRef.current;

    if (!picker) return;

    const items = Array.from(picker.children);

    const pickerCenter =
      picker.getBoundingClientRect().top + picker.clientHeight / 2;

    let closestItem = items[0];
    let closestDistance = Infinity;

    items.forEach((item) => {
      const rect = item.getBoundingClientRect();

      const itemCenter = rect.top + rect.height / 2;
      const distance = Math.abs(pickerCenter - itemCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestItem = item;
      }
    });

    const index = items.indexOf(closestItem);

    setSelectedOrganisation(organisationNames[index]);
  };

  return (
    <div className="fixed flex inset-0 bg-black/50 justify-center items-center">
      <div className="bg-white shadow-xl rounded-xl w-4/5 h-7/10">
        <div className="flex h-20 justify-between">
          <div className="w-10"></div>
          <div className="flex items-center">
            <h1 className="text-black text-[20px] font-bold">
              Choose a company
            </h1>
          </div>
          <Button
            onClick={onClose}
            className="flex h-10 w-10 text-black bg-red-500 items-center justify-center font-bold text-4xl rounded-tr-xl rounded-bl-xl shadow-xl"
          >
            x
          </Button>
        </div>
        <div
          className="h-8/10 overflow-y-scroll snap-y snap-mandatory py-45"
          ref={pickerRef}
          onScroll={handleScroll}
        >
          {organisationNames.map((name) => (
            <div
              className={`h-16 flex items-center justify-center snap-center font-bold text-xl ${
                selectedOrganisation === name
                  ? "text-black font-bold scale-110"
                  : "text-gray-500"
              }`}
              key={name}
            >
              {name}
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <Button
            className="bg-green-500 p-3 rounded-xl shadow-xl text-xl text-black font-bold"
            onClick={() => {
              addOrg(selectedOrganisation);
              onClose();
            }}
          >
            Confirm: {selectedOrganisation}
          </Button>
        </div>
      </div>
    </div>
  );
}
