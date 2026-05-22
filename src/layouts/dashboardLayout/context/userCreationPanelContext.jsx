import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import UserCreationPanel from '../../../components/userCreation/js/userCreationPanel';

const UserCreationPanelContext = createContext(null);

export const UserCreationPanelProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openUserCreation = useCallback(() => setIsOpen(true), []);
  const closeUserCreation = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({
      isOpen,
      openUserCreation,
      closeUserCreation,
    }),
    [isOpen, openUserCreation, closeUserCreation],
  );

  return (
    <UserCreationPanelContext.Provider value={value}>
      {children}
      <UserCreationPanel isOpen={isOpen} onClose={closeUserCreation} />
    </UserCreationPanelContext.Provider>
  );
};

export const useUserCreationPanel = () => {
  const context = useContext(UserCreationPanelContext);

  if (!context) {
    throw new Error('useUserCreationPanel must be used within UserCreationPanelProvider');
  }

  return context;
};
