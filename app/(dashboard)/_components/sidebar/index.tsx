import { List } from './List';
import { NewButton } from './NewButton';

export const Sidebar = () => {
  return (
    <aside className='fixed z-[1] left-0 bg-blue-950 h-full w-[60px] flex p-3 flex-col gap-y-6 text-white'>
      <List />
      <NewButton />
    </aside>
  );
};
