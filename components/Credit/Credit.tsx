import { ReactNode, useState } from 'react';
import Button from '../Button';
import { CreditType } from '../types/Credit';

export default function Credit({
  name = 'ANONIM',
  summ = 10,
  onDelete
}: CreditType) {
  const [circles, setCircles] = useState(1);

  if (name === '') name = 'ANONIM';
  if (summ === 0 || summ < 0) summ = 10;

  const debt =
    summ <= 5
      ? Math.ceil(summ * (circles + 1))
      : summ <= 100
        ? Math.ceil(summ * (0.5 * circles + 1))
        : 0;

  const changeCircles = (operation: string) => {
    if (operation === '+' && circles < 9) setCircles(circles + 1);
    if (operation === '-' && circles > 1) setCircles(circles - 1);
  };

  return (
    <div className='flex items-center gap-2 rounded-xl border border-black bg-gray-500 p-2'>
      <div className='flex flex-col gap-3'>
        <h1 className='w-[20vw] rounded-full bg-gray-600 p-2 pr-4 pl-4 text-xs font-bold'>
          {name}
        </h1>
        <h1 className='w-[20vw] rounded-full bg-gray-600 p-2 pr-4 pl-4 font-bold'>
          {summ}
        </h1>
      </div>
      <div className='h-15 w-0.5 rounded-full bg-gray-400'></div>
      <div>
        <h1>{circles}</h1>
      </div>
      <div className='h-15 w-0.5 rounded-full bg-gray-400'></div>
      <div className='flex flex-col gap-3'>
        <Button
          className='flex h-10 w-[15vw] items-center justify-center rounded-full bg-amber-300 text-3xl'
          onClick={() => changeCircles('-')}
        >
          -
        </Button>
        <Button
          className='flex h-10 w-[15vw] items-center justify-center rounded-full bg-amber-300 text-3xl'
          onClick={() => changeCircles('+')}
        >
          +
        </Button>
      </div>
      <div className='h-15 w-0.5 rounded-full bg-gray-400'></div>
      <div>
        <h1>{debt}</h1>
      </div>
      <div className='h-15 w-0.5 rounded-full bg-gray-400'></div>
      <Button
        className='flex h-20 w-[15vw] items-center justify-center rounded-2xl bg-amber-300 text-3xl'
        onClick={onDelete}
      >
        <div className='h-9/10 w-8/10 rounded-xl bg-green-700'></div>
      </Button>
    </div>
  );
}
