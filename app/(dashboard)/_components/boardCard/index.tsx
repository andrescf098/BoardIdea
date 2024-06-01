'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Overlay } from './Overlay';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '@clerk/nextjs';
import { Footer } from './Footer';
import { Skeleton } from '@/components/ui/skeleton';

interface BoardCardProps {
  id: string;
  title: string;
  authorName: string;
  authorId: string;
  createdAt: number;
  imageUrl: string;
  orgId: string;
  idFavorite: boolean;
}
export const BoardCard = ({
  id,
  title,
  imageUrl,
  authorId,
  authorName,
  createdAt,
  orgId,
  idFavorite,
}: BoardCardProps) => {
  const { userId } = useAuth();
  const authorLabel = authorId === userId ? 'You' : authorName;
  const createdAtLabel = formatDistanceToNow(createdAt, { addSuffix: true });

  return (
    <Link href={`/board${id}`}>
      <div className='group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden'>
        <div className='relative flex-1'>
          <Image
            src={imageUrl}
            alt={title}
            fill
            className='object-cover w-full h-full'
          />
          <Overlay />
        </div>
        <Footer
          isFavorite={idFavorite}
          title={title}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          onClick={() => {}}
          disabled={false}
        />
      </div>
    </Link>
  );
};

BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className='aspect-[100/127] rounded-lg overflow-hidden'>
      <Skeleton className='h-full w-full' />
    </div>
  );
};
