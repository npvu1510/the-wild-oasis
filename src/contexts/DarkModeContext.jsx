import { createContext, useContext, useEffect } from 'react';

import useLocalStorageState from '../hooks/useLocalStorageState';

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  const [isDarkMode, setDarkMode] = useLocalStorageState(false, 'isDarkMode');

  useEffect(() => {
    const classList = document.documentElement.classList;

    if (isDarkMode) {
      classList.add('dark-mode');
      classList.remove('light-mode');
    } else {
      classList.add('light-mode');
      classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);

  if (context === undefined) throw new Error('Context not found');

  return context;
}

export { DarkModeProvider, useDarkMode };
