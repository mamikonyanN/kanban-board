import { Theme } from '@/types/theme';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type SettingsState = {
  theme: Theme;
  toggleTheme: () => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
};

export const settingsStore = create<SettingsState>()(
  persist(
    devtools(
      immer((set) => ({
        theme: 'light',
        isSidebarOpen: true,

        toggleTheme: () =>
          set((state) => {
            state.theme = state.theme === 'dark' ? 'light' : 'dark';
          }),
        toggleSidebar: () =>
          set((state) => {
            state.isSidebarOpen = !state.isSidebarOpen;
          }),
      }))
    ),
    { name: 'settings' }
  )
);
