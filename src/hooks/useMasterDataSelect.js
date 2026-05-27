import { useMemo } from 'react';
import { useMasterDataContext } from '../context/masterDataContext';
import { buildRoleLoadingOptions } from '../utils/masterDataOptions';

/**
 * Dropdown options from GET /api/v1/master-data for a single key.
 */
export const useMasterDataSelect = (
  key,
  {
    placeholder = '',
    prepend = [],
    append = [],
    includeEmpty = false,
    loadingLabel = 'Loading…',
    useIdAsValue = false,
  } = {},
) => {
  const { data, isLoading, error, refetch, getOptions } = useMasterDataContext();

  const options = useMemo(() => {
    if (isLoading) {
      return buildRoleLoadingOptions(loadingLabel);
    }

    return getOptions(key, {
      placeholder,
      prepend,
      append,
      includeEmpty,
      useIdAsValue,
    });
  }, [
    append,
    getOptions,
    includeEmpty,
    isLoading,
    key,
    loadingLabel,
    placeholder,
    prepend,
    useIdAsValue,
  ]);

  const isReady = !isLoading && !error;

  return {
    options,
    isLoading,
    error,
    refetch,
    isReady,
    data,
  };
};
