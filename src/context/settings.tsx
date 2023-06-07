'use client';

import { createContext, useContext } from 'react';
import { Settings } from '@/api/settings';

type SettingsContextProps = {
  settings: Settings | null;
};

type SettingsContextProviderProps = {
  children: React.ReactNode;
  settings: Settings | null;
};

export const SettingsContext = createContext<SettingsContextProps>({
  settings: null,
});

export const useSettingsContext = () => useContext(SettingsContext);

export const SettingsContextProvider = ({
  children,
  settings,
}: SettingsContextProviderProps) => {
  return (
    <SettingsContext.Provider
      value={{
        settings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
