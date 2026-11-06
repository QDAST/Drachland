import Button from '../Button';
import { MenuButtonType } from '../types/MenuButton';

export default function MenuButton({ onClick }: MenuButtonType) {
  return (
    <div className='flex'>
      <div className='flex rounded-full border border-black bg-gray-200'>
        <Button
          onClick={onClick}
          className='h-10 w-10 justify-center transition-all'
        >
          <div className='flex flex-col items-center justify-center gap-1'>
            <div className='flex h-0.75 w-5 rounded-full bg-gray-500'></div>
            <div className='flex h-0.75 w-5 rounded-full bg-gray-500'></div>
            <div className='flex h-0.75 w-5 rounded-full bg-gray-500'></div>
          </div>
        </Button>
      </div>
    </div>
  );
}
