import { AppendCardModalType } from '../types/AppendCardModal';
import Button from '../Button';
import { OrganisationName, organisations } from '@/public/assets/organisations';
import { useState, useRef } from 'react';

export default function AppendCardModal({
  onClose,
  addOrg
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

    items.forEach(item => {
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
    <div className='fixed inset-0 flex items-center justify-center bg-black/50'>
      <div className='h-7/10 w-4/5 rounded-xl bg-white shadow-xl'>
        <div className='flex h-20 justify-between'>
          <div className='w-10'></div>
          <div className='flex items-center'>
            <h1 className='text-[20px] font-bold text-black'>
              Choose a company
            </h1>
          </div>
          <Button
            onClick={onClose}
            className='flex h-10 w-10 items-center justify-center rounded-tr-xl rounded-bl-xl bg-red-500 text-4xl font-bold text-black shadow-xl'
          >
            x
          </Button>
        </div>
        <div
          className='h-8/10 snap-y snap-mandatory overflow-y-scroll py-45'
          ref={pickerRef}
          onScroll={handleScroll}
        >
          {organisationNames.map(name => (
            <div
              className={`flex h-16 snap-center items-center justify-center text-xl font-bold ${
                selectedOrganisation === name
                  ? 'font-bold text-black'
                  : 'text-gray-500'
              }`}
              key={name}
            >
              {name}
            </div>
          ))}
        </div>
        <div className='flex justify-center'>
          <Button
            className='rounded-xl bg-green-500 p-3 text-xl font-bold text-black shadow-xl'
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
