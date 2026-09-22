import { useState } from 'react';
import Button from '../Button';
import Credit from './Credit';

export default function CreditMenu() {
  const [credits, setCredits] = useState<string[]>([]);
  const [summ, setSumm] = useState(0);
  const [name, setName] = useState('');

  const addNewCredit = () => {
    setCredits([...credits, name]);
    setName('');
  };
  const deleteCredit = (index: number) => {
    setCredits(prev => prev.filter((_, i) => i !== index));
  };
  return (
    <div className='flex flex-col gap-3 rounded-xl bg-gray-400 p-1'>
      <h1 className='flex justify-center font-bold text-black'>Credit Menu</h1>
      <div className='flex flex-col gap-3'>
        <input
          type='text'
          value={name}
          onChange={event => setName(event.target.value)}
          placeholder='Name'
          className='w-full justify-center rounded-xl bg-gray-800 p-2 text-center font-bold text-white'
        />
        <input
          type='text'
          inputMode='numeric'
          value={summ}
          onChange={event => {
            const value = event.target.value;
            if (!/^\d*$/.test(value)) return;
            setSumm(Number(value) || 0);
          }}
          placeholder='Summ'
          className='w-full justify-center rounded-xl bg-gray-800 p-2 text-center font-bold text-white'
        />
        <Button
          className='h-10 w-full justify-center rounded-xl border border-black bg-amber-400 p-2 text-center font-bold text-black'
          onClick={addNewCredit}
        >
          New Credit
        </Button>
      </div>
      <div className='flex flex-col gap-3'>
        {credits.map((creditName, index) => (
          <Credit
            name={creditName}
            summ={summ}
            onDelete={() => deleteCredit(index)}
            key={index}
          ></Credit>
        ))}
      </div>
    </div>
  );
}
