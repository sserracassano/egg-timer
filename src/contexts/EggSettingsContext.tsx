import { createContext, useState } from "react";

export const EggSettingsContext = createContext<any>({});

export function EggSettingsProvider({ children }: any) {
  const [eggSettings, setEggSettings] = useState({
    size: 0,
    temp: 0,
    recipe: 0,
  });

  return (
    <EggSettingsContext.Provider
      value={{
        eggSettings,
        setEggSettings,
      }}
    >
      {children}
    </EggSettingsContext.Provider>
  );
}
