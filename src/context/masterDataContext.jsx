import { createContext, useContext, useMemo } from 'react';
import { useMasterData } from '../hooks/useMasterData';
import {
  buildSelectOptions,
  getMasterDataIdOptions,
  getMasterDataOptions,
} from '../utils/masterDataOptions';

const MasterDataContext = createContext(null);

export const MasterDataProvider = ({ children }) => {
  const { data, isLoading, error, refetch } = useMasterData(true);

  const value = useMemo(
    () => ({
      data,
      isLoading,
      error,
      refetch,
      getOptions: (key, config) => buildSelectOptions(data, key, config),
      getRawOptions: (key) => getMasterDataOptions(data, key),
      getRawIdOptions: (key) => getMasterDataIdOptions(data, key),
    }),
    [data, isLoading, error, refetch],
  );

  return (
    <MasterDataContext.Provider value={value}>
      {children}
    </MasterDataContext.Provider>
  );
};

export const useMasterDataContext = () => {
  const context = useContext(MasterDataContext);
  if (!context) {
    throw new Error('useMasterDataContext must be used within MasterDataProvider');
  }
  return context;
};

/**
 * Safe hook when provider may be absent (e.g. login shell).
 */
export const useMasterDataContextOptional = () => useContext(MasterDataContext);
