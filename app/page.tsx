'use client';

import Image from 'next/image';
import Button from '@/components/Button';
import CreditMenu from '@/components/Credit/CreditMenu';
import { supabase } from '@/lib/supabase';
import { useState, useEffect } from 'react';
import CounterMenu from '@/components/Counter/CounterMenu';
import Header from '@/components/Header/Header';
import BottomPanel from '@/components/BottomPanel/BottomPanel';
import OrgPanel from '@/components/OrgPanel/OrgPanel';
import { OrganisationName } from '@/public/assets/organisations';
import { TransportName } from '@/public/assets/transport';
import BankPanel from '@/components/BankPanel/BankPanel';
import BankModal from '@/components/BankModal/BankModal';
import { CreditOneType } from '@/components/types/CreditOne';
import { Player } from '@/components/types/Counter';
import {
  getPlayers,
  subscribeToPlayers,
  deletePlayer as apiDeletePlayer,
  createPlayer as apiCreatePlayer,
  updateBalance as apiUpdateBalance
} from '../components/Counter/api';

export default function Home() {
  // [{"name": ""}]
  const [players, setPlayers] = useState<Player[]>([]);
  const [isBankOpen, setIsBankOpen] = useState(false);
  const [credits, setCredits] = useState<CreditOneType[]>([]);
  const [playerOrgs, setPlayerOrgs] = useState<OrganisationName[]>([
    'Moroboro',
    'Minisoft'
  ]);
  const [openedOrgs, setOpenedOrgs] = useState<OrganisationName[]>(playerOrgs);
  const [playerTrans, setPlayerTrans] = useState<TransportName[]>([
    //'helicopter',
    //'plane'
  ]);
  const closeOrg = (name: OrganisationName) => {
    setOpenedOrgs(() => openedOrgs.filter(org => org !== name));
  };
  const openOrg = (name: OrganisationName) => {
    setOpenedOrgs(() => [...openedOrgs, name]);
  };
  const addOrg = (newOrg: OrganisationName) => {
    if (!playerOrgs.includes(newOrg)) {
      setPlayerOrgs(() => [...playerOrgs, newOrg]);
      openOrg(newOrg);
    }
  };
  const removeOrg = (name: OrganisationName) => {
    setOpenedOrgs(() => openedOrgs.filter(org => org !== name));
    setPlayerOrgs(() => playerOrgs.filter(org => org !== name));
  };

  const loadPlayers = async () => {
    try {
      const data = await getPlayers();
      setPlayers(data);
    } catch (error) {
      console.error('loadPlayers error:', error);
    }
  };

  useEffect(() => {
    loadPlayers();

    const interval = setInterval(() => {
      loadPlayers();
    }, 5000); // 1000 мс = 1 секунда

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className='flex min-h-screen w-screen flex-col gap-3 bg-gray-300'>
      <Header></Header>
      <OrgPanel
        orgs={playerOrgs}
        removeOrg={removeOrg}
        closeOrg={closeOrg}
        openOrg={openOrg}
      ></OrgPanel>
      <BankPanel onOpen={() => setIsBankOpen(true)}></BankPanel>
      {isBankOpen && (
        <BankModal
          onClose={() => setIsBankOpen(false)}
          credits={credits}
          setCredits={setCredits}
          players={players}
          setPlayers={setPlayers}
        ></BankModal>
      )}
      <div className='h-20'></div>
      <BottomPanel
        openedOrgs={openedOrgs}
        trans={playerTrans}
        addOrg={addOrg}
      ></BottomPanel>
    </div>
  );
}
