import type { ProfitProcessingModalType } from '../types/ProfitProcessingModal';
import Button from '../Button';

export default function ProfitProcessingModal({
  onClose,
  income,
  outcome
}: ProfitProcessingModalType) {
  const profit = income - outcome;
  const isProfitable = profit >= 0;

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'
      onClick={onClose}
    >
      <div
        className='flex w-full max-w-md flex-col overflow-hidden rounded-xl bg-white shadow-2xl'
        onClick={e => e.stopPropagation()}
      >
        <div className='flex justify-end'>
          <Button
            className='flex h-10 w-10 items-center justify-center rounded-bl-xl bg-red-500 text-2xl font-bold text-white transition-colors hover:bg-red-600'
            onClick={onClose}
            aria-label='Закрыть'
          >
            ✕
          </Button>
        </div>

        <div className='flex flex-col items-center gap-2 px-6 pb-8 text-center'>
          <span className='text-xl font-bold text-green-500'>
            Income: {income}
          </span>
          <span className='text-xl font-bold text-red-500'>
            Outcome: {outcome}
          </span>

          <div className='my-3 h-px w-full bg-gray-200' />

          <span
            className={`text-2xl font-extrabold ${
              isProfitable ? 'text-green-500' : 'text-red-500'
            }`}
          >
            Profit: {profit}
          </span>
        </div>
      </div>
    </div>
  );
}
