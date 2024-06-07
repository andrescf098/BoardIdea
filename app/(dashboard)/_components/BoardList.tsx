'use client';

import { api } from '@/convex/_generated/api';
import { Empty } from './Empty';
import { EmptyBoards } from './EmptyBoards';
import { useQuery } from 'convex/react';
import { BoardCard } from './boardCard';
import { NewBoardButton } from './NewBoardButton';

interface BoardListProps {
  orgId: string;
  query: {
    search?: string;
    favorites?: string;
  };
}

export const BoardList = ({ orgId, query }: BoardListProps) => {
  const data = useQuery(api.boards.get, { orgId, ...query });

  if (data === undefined) {
    return (
      <div>
        <h2 className='text-3xl'>
          {query.favorites ? 'Favorite boards' : 'Team boards'}
        </h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10'>
          <NewBoardButton orgId={orgId} disabled />
          <BoardCard.Skeleton />
        </div>
      </div>
    );
  }

  if (!data?.length && query.search) {
    return (
      <Empty
        title='No results found!'
        text='Try searching for something else'
      />
    );
  } else if (!data?.length && query.favorites) {
    return <Empty title='No favorite boards!' text='Try favorting a board' />;
  } else if (!data?.length) {
    return (
      <EmptyBoards
        title='Create your first board!'
        text='Start by creating a board for your organization'
      />
    );
  }
  return (
    <div>
      <h2 className='text-3xl'>
        {query.favorites ? 'Favorite boards' : 'Team boards'}
      </h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10'>
        {!query.favorites && <NewBoardButton orgId={orgId} />}
        {data?.map((board) => (
          <BoardCard
            key={board._id}
            id={board._id}
            title={board.title}
            imageUrl={board.imageUrl}
            authorId={board.authorId}
            authorName={board.authorName}
            createdAt={board._creationTime}
            orgId={board.orgId}
            isFavorite={board.isFavorite}
          />
        ))}
      </div>
    </div>
  );
};
