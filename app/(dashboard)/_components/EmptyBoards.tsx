'use client';

import { Button } from '@/components/ui/button';
import { api } from '@/convex/_generated/api';
import { useOrganization } from '@clerk/nextjs';
import { useApiMutation } from '@/hooks/useApiMutation';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface EmptyProps {
  title: string;
  text: string;
}

export const EmptyBoards = ({ title, text }: EmptyProps) => {
  const router = useRouter();
  const { organization } = useOrganization();
  const { mutate, pending } = useApiMutation(api.board.create);
  const onClick = () => {
    if (!organization) return;
    mutate({ orgId: organization.id, title: 'New board' })
      .then((id) => {
        toast.success('Board created');
        router.push(`/board/${id}`);
      })
      .catch((error) => {
        toast.error('Failed to create board');
      });
  };
  return (
    <div className='h-full flex flex-col items-center justify-center'>
      <h2 className='text-2xl font-semibold mt-6'>{title}</h2>
      <p className='text-muted-foreground text-sm mt-2'>{text}</p>
      <div className='mt-6'>
        <Button size='lg' disabled={pending} onClick={onClick}>
          Create board
        </Button>
      </div>
    </div>
  );
};
