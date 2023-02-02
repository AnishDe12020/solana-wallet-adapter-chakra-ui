import React, { FC, ReactNode, useState } from 'react';
import { WalletDialogContext } from './useWalletDialog.js';
import { WalletDialog } from './WalletDialog.js';

export interface WalletDialogProviderProps {
  children: ReactNode;
}

export const WalletDialogProvider: FC<WalletDialogProviderProps> = ({
  children,
  ...props
}) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <WalletDialogContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        isOpen,
        setOpen,
      }}
    >
      {children}
      <WalletDialog {...props} />
    </WalletDialogContext.Provider>
  );
};
