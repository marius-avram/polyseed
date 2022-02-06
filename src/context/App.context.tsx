import React, {
  createContext, useCallback, useContext, useState,
} from 'react';
import { ethers } from 'ethers';

export const AppContext = createContext<AppContextType>(null as any);

export type AppStateType = {
  sequenceProvider: ethers.providers.Web3Provider | null;
  network: string | null;
  address: string | null;
};

export type AppContextType = {
  state: AppStateType,
  setSequenceProvider: (sequenceProvider: ethers.providers.Web3Provider | null) => void
  setNetwork: (network: string | null) => void
  setAddress: (address: string | null) => void
};

export function AppProvider(props: any) {
  const [state, setState] = useState<AppStateType>({
    sequenceProvider: null,
    network: null,
    address: null
  });

  const setSequenceProvider = useCallback((sequenceProvider: ethers.providers.Web3Provider | null) => {
    setState((current: AppStateType) => ({
      ...current,
      sequenceProvider
    }));
  }, []);

  const setNetwork = useCallback((network: string | null) => {
    setState((current: AppStateType) => ({
      ...current,
      network
    }));
  }, []);

  const setAddress = useCallback((address: string | null) => {
    setState((current: AppStateType) => ({
      ...current,
      address
    }));
  }, []);

  const value: AppContextType = {
    state,
    setSequenceProvider,
    setNetwork,
    setAddress
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
}

export function useAppContext(): AppContextType {
  return useContext(AppContext);
}