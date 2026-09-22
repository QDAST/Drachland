import CounterMenu from '../Counter/CounterMenu';
import CreditMenu from '../Credit/CreditMenu';
import Button from '../Button';
import { BankModalType } from '../types/BankModal';

export default function BankModal({ onClose }: BankModalType) {
  return (
    <div className='fixed inset-0 bg-black/50 p-5 pb-25'>
      <div className='flex h-full w-full flex-col gap-3 rounded-xl bg-white shadow-xl'>
        <Button
          onClick={onClose}
          className='flex h-10 w-full items-center justify-center rounded-t-xl bg-red-500 text-3xl font-bold text-black'
        >
          Close Bank
        </Button>
        <div className='flex flex-col gap-3 overflow-y-scroll px-5'>
          <CounterMenu></CounterMenu>
          <CreditMenu></CreditMenu>
        </div>
      </div>
    </div>
  );
}
