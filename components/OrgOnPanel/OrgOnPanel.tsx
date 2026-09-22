import Button from '../Button';
import { OrgOnPanelType } from '../types/OrgOnPanel';
import { OrganisationName } from '@/public/assets/organisations';
import { useState } from 'react';
import { organisations } from '@/public/assets/organisations';

export default function OrgOnPanel({
  closeOrg,
  openOrg,
  removeOrg,
  name
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
      className={`flex h-20 w-full flex-col items-center justify-between rounded-2xl shadow-xl transition-all duration-200 ${!isOpened ? 'bg-gray-200' : 'bg-white'}`}
    >
      <div className='flex w-full justify-between pl-5'>
        <div>
          <h1 className='pt-1 font-bold text-black'>{name}</h1>
        </div>

        <Button
          onClick={() => removeOrg(name)}
          className='h-5 w-10 rounded-tr-xl rounded-bl-xl bg-red-500'
        ></Button>
      </div>
      <div className='flex w-full'>
        <div className='flex w-full justify-between pl-3'>
          <span className='text-[20px] text-red-500'>
            {organisations[name].price}
          </span>
          <span className='text-[20px] text-green-500'>
            {organisations[name].profit}
          </span>
          <div className='flex flex-col justify-between'>
            <div></div>
            <Button
              className='flex h-5 w-10 rounded-tl-xl rounded-br-xl bg-gray-500'
              onClick={() => onClick(name)}
            ></Button>
          </div>
        </div>
      </div>
    </div>
  );
}
