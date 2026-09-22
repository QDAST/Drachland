'use client';

import Button from '../Button';
import { CounterProps } from '../types/Counter';

export default function Counter({
  children,
  name = '',
  step = 1,
  balance = 0,
  onChange,
  onDelete
}: CounterProps) {
  return (
    <div className='flex flex-col items-center gap-3 rounded-xl border border-black bg-gray-500 p-5'>
      <div className='flex w-full gap-3'>
        <span className='text-10px flex h-10 w-full items-center justify-center rounded-full bg-gray-100 font-bold text-black'>
          {name.trim() !== '' ? name.toUpperCase() : 'ANONIM'}
        </span>
        <Button
          onClick={onDelete}
          className='flex w-12 items-center justify-center rounded-full bg-red-600 text-[20px] font-bold'
        >
          X
        </Button>
      </div>

      <div className='flex h-0.5 w-3/4 rounded-full bg-gray-400'></div>
      <div className='flex w-10/10 content-center justify-between'>
        <Button
          className='flex h-10 w-3/10 items-center justify-center rounded-l-full bg-amber-400 text-3xl'
          onClick={() => onChange?.(balance! - step)}
        >
          -
        </Button>
        <div className='flex w-4/10 items-center bg-gray-600 pr-2 pl-2 text-3xl'>
          {balance}
        </div>
        <Button
          className='flex h-10 w-3/10 items-center justify-center rounded-r-full bg-amber-400 text-3xl'
          onClick={() => onChange?.(balance! + step)}
        >
          +
        </Button>
      </div>
    </div>
  );
}
