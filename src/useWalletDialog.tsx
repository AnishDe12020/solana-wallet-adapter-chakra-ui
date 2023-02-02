// import { useDisclosure } from '@chakra-ui/react';

// export const useWalletDialog = () => {
//   const { isOpen, onOpen, onClose, onToggle } = useDisclosure({
//     id: 'wallet-multi-modal',
//   });

//   return {
//     isOpen,
//     onOpen,
//     onClose,
//     onToggle,
//   };
// };

import { createContext, useContext } from 'react';

export interface WalletDialogContextState {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
}

export const WalletDialogContext = createContext<WalletDialogContextState>({
  isOpen: false,
  setOpen: () => false,
} as WalletDialogContextState);

export const useWalletDialog = (): WalletDialogContextState =>
  useContext(WalletDialogContext);
