import { Button } from '@/components/ui/button';

interface EmptyProps {
  title: string;
  text: string;
}

export const EmptyBoards = ({ title, text }: EmptyProps) => {
  return (
    <div className='h-full flex flex-col items-center justify-center'>
      <h2 className='text-2xl font-semibold mt-6'>{title}</h2>
      <p className='text-muted-foreground text-sm mt-2'>{text}</p>
      <div className='mt-6'>
        <Button size='lg'>Create board</Button>
      </div>
    </div>
  );
};
