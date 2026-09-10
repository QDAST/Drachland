import MenuButton from "../MenuButton/MenuButton";
import AppendCardButton from "../AppendCardButton/AppendCardButton";
import ProfitProcessingButton from "../ProfitProcessingButton/ProfitProcessingButton";
import FinancyDisplay from "../FinancyDisplay/FinancyDisplay";
import { useEffect, useState } from "react";
import { BottomPanelType } from "../types/BottomPanel";
import { organisations } from "@/public/assets/organisations";
import { transport } from "@/public/assets/transport";
import AppendCardModal from "../AppendCardModal/AppendCardModal";
import MenuModal from "../MenuModal/MenuModal";
import ProfitProcessingModal from "../ProfitProcessingModal/ProfitProcessingModal";

export default function BottomPanel({ orgs, trans, addOrg }: BottomPanelType) {
  const income = orgs.reduce((total, org) => {
    return total + organisations[org].profit;
  }, 0);

  const outcome = trans.reduce((total, tran) => {
    return total + transport[tran].tax;
  }, 0);

  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [isProfitModalOpen, setIsProfitModalOpen] = useState(false);

  return (
    <div className="flex fixed bottom-0 w-full h-20 bg-white justify-center items-center px-5 gap-7">
      <MenuButton onClick={() => setIsMenuModalOpen(true)}></MenuButton>
      <FinancyDisplay text={`+${income}`} income={true}></FinancyDisplay>
      <ProfitProcessingButton
        onClick={() => setIsProfitModalOpen(true)}
      ></ProfitProcessingButton>
      <FinancyDisplay text={`-${outcome}`} income={false}></FinancyDisplay>
      <AppendCardButton
        onClick={() => setIsCardModalOpen(true)}
      ></AppendCardButton>
      {isCardModalOpen && (
        <AppendCardModal
          onClose={() => setIsCardModalOpen(false)}
          addOrg={addOrg}
        ></AppendCardModal>
      )}
      {isMenuModalOpen && (
        <MenuModal onClose={() => setIsMenuModalOpen(false)}></MenuModal>
      )}
      {isProfitModalOpen && (
        <ProfitProcessingModal
          onClose={() => setIsProfitModalOpen(false)}
          income={income}
          outcome={outcome}
        ></ProfitProcessingModal>
      )}
    </div>
  );
}
