"use client";

import Image from "next/image";
import Button from "@/components/Button";
import CreditMenu from "@/components/Credit/CreditMenu";
import { useState } from "react";
import CounterMenu from "@/components/Counter/CounterMenu";
import Header from "@/components/Header/Header";
import BottomPanel from "@/components/BottomPanel/BottomPanel";
import OrgPanel from "@/components/OrgPanel/OrgPanel";
import { OrganisationName } from "@/public/assets/organisations";
import { TransportName } from "@/public/assets/transport";
import BankPanel from "@/components/BankPanel/BankPanel";
import BankModal from "@/components/BankModal/BankModal";

export default function Home() {
  const [isBankOpen, setIsBankOpen] = useState(false);
  const [playerOrgs, setPlayerOrgs] = useState<OrganisationName[]>([
    "Moroboro",
    "Minisoft",
    "RedBall",
  ]);
  const [openedOrgs, setOpenedOrgs] = useState<OrganisationName[]>(playerOrgs);
  const [playerTrans, setPlayerTrans] = useState<TransportName[]>([
    "helicopter",
    "plane",
  ]);
  const closeOrg = (name: OrganisationName) => {
    setOpenedOrgs(() => openedOrgs.filter((org) => org !== name));
  };
  const openOrg = (name: OrganisationName) => {
    setOpenedOrgs(() => [...openedOrgs, name]);
  };
  const addOrg = (newOrg: OrganisationName) => {
    setPlayerOrgs(() => [...playerOrgs, newOrg]);
    openOrg(newOrg);
  };
  const removeOrg = (name: OrganisationName) => {
    setPlayerOrgs(() => playerOrgs.filter((org) => org !== name));
  };

  return (
    <div className="flex flex-col bg-gray-300 min-h-screen h-full w-screen gap-3">
      <Header></Header>
      <OrgPanel
        orgs={playerOrgs}
        removeOrg={removeOrg}
        closeOrg={closeOrg}
        openOrg={openOrg}
      ></OrgPanel>
      {isBankOpen && (
        <BankModal onClose={() => setIsBankOpen(false)}></BankModal>
      )}
      <BankPanel onOpen={() => setIsBankOpen(true)}></BankPanel>
      <BottomPanel
        openedOrgs={openedOrgs}
        trans={playerTrans}
        addOrg={addOrg}
      ></BottomPanel>
    </div>
  );
}
