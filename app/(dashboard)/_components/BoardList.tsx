'use client';

import { Empty } from './Empty';
import { EmptyBoards } from './EmptyBoards';

interface BoardListProps {
  orgId: string;
  query: {
    search?: string;
    favorites?: string;
  };
}

export const BoardList = ({ orgId, query }: BoardListProps) => {
  const data = [];

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
  return <div>{JSON.stringify(query)}</div>;
};
