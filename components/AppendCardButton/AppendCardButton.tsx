import Button from '../Button';
import { AppendCardButtonType } from '../types/AppendCardButton';

export default function AppendCardButton({ onClick }: AppendCardButtonType) {
  return (
    <div className='flex h-10 w-10 items-center justify-center'>
      <div className='flex h-full w-full items-center justify-center rounded-full border border-black bg-gray-200'>
        <Button
          onClick={onClick}
          className='transition-al flex text-[40px] text-gray-500 hover:bg-gray-200'
        >
          +
        </Button>
      </div>
    </div>
  );
}
