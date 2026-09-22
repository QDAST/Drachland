import { OrgPanelType } from '../types/OrgPanel';
import { OrganisationName, organisations } from '@/public/assets/organisations';
import Button from '../Button';
import { useState } from 'react';
import OrgOnPanel from '../OrgOnPanel/OrgOnPanel';

export default function OrgPanel({
  orgs,
  removeOrg,
  closeOrg,
  openOrg
}: OrgPanelType) {
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
    <div className=''>
      <div className='grid-flow grid grid-cols-2 gap-5 px-3'>
        {orgs.map((name, index) => (
          <OrgOnPanel
            closeOrg={closeOrg}
            openOrg={openOrg}
            removeOrg={removeOrg}
            index={index}
            name={name}
            key={index}
          ></OrgOnPanel>
        ))}
      </div>
    </div>
  );
}
