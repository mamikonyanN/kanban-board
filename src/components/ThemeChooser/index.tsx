import { ReactComponent as MoonIcon } from '@/assets/moon_icon.svg';
import { ReactComponent as SunIcon } from '@/assets/sun_icon.svg';
import { settingsStore } from '@/store';
import Switch from '@/ui/Switch';
import { useEffect } from 'react';
import './themeChooser.css';

const ThemeChooser = () => {
  const theme = settingsStore((state) => state.theme);

  const toggleTheme = settingsStore((state) => state.toggleTheme);

  document.body.classList.add('theme__' + (theme ?? 'dark'));

  useEffect(
    () =>
      settingsStore.subscribe((state) => {
        document.body.classList.remove('theme__dark');
        document.body.classList.remove('theme__light');
        document.body.classList.add('theme__' + state.theme);
      }),
    []
  );

  return (
    <div className="theme-chooser">
      <SunIcon />
      <Switch checked={theme === 'dark'} onChange={toggleTheme} />
      <MoonIcon />
    </div>
  );
};

export default ThemeChooser;
