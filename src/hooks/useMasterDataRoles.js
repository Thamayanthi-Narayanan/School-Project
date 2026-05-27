import { MASTER_DATA_KEYS } from '../utils/masterDataOptions';
import { useMasterDataSelect } from './useMasterDataSelect';
import {
  buildCreateRoleSelectOptions,
  buildEditRoleSelectOptions,
} from '../utils/roleSelectOptions';

/**
 * Role dropdown from master data (User Creation).
 */
export const useMasterDataRoles = (placeholder = 'Select role') => {
  const { options: apiRoleOptions, isLoading, error, refetch, data } = useMasterDataSelect(
    MASTER_DATA_KEYS.role,
    { loadingLabel: 'Loading roles…' },
  );

  return {
    apiRoleOptions: isLoading ? [] : apiRoleOptions,
    isLoading,
    error,
    refetch,
    data,
    buildCreateOptions: () => buildCreateRoleSelectOptions(
      isLoading ? [] : apiRoleOptions,
      placeholder,
    ),
    buildEditOptions: (currentRole) => buildEditRoleSelectOptions(
      isLoading ? [] : apiRoleOptions,
      currentRole,
    ),
  };
};
