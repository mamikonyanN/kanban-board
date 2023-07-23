import { settingsStore } from '@/store';
import { FC } from 'react';
import NavList from '../NavList';
import ThemeChooser from '../ThemeChooser';
import './sidebar.css';

const Sidebar: FC = () => {
  const isSidebarOpen = settingsStore((state) => state.isSidebarOpen);

  return (
    <aside className={'sidebar ' + (!isSidebarOpen && 'sidebar__close')}>
      <NavList />
      <ThemeChooser />
    </aside>
  );
};

export default Sidebar;
