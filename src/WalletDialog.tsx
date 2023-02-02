import React, {
  FC,
  SyntheticEvent,
  useCallback,
  useMemo,
  useState,
} from 'react';
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  List,
  ListItem,
  Button,
  Collapse,
  Icon,
} from '@chakra-ui/react';
import { WalletName, WalletReadyState } from '@solana/wallet-adapter-base';
import { useWallet, Wallet } from '@solana/wallet-adapter-react';
import { ChevronsDownUpIcon, ChevronsUpDownIcon } from 'lucide-react';
import { useWalletDialog } from './useWalletDialog';
import { WalletListItem } from './WalletListItem';

interface WalletDialogProps
  extends Omit<ModalProps, 'title' | 'isOpen' | 'onClose' | 'children'> {
  featuredWallets?: number;
  title?: string;
}

export const WalletDialog: FC<WalletDialogProps> = ({
  title = 'Select Your Wallet',
  featuredWallets = 3,
  ...props
}) => {
  const { wallets, select } = useWallet();
  const { isOpen, setOpen } = useWalletDialog();

  const [expanded, setExpanded] = useState(false);

  const [featured, more] = useMemo(() => {
    const installed: Wallet[] = [];
    const loadable: Wallet[] = [];
    const notDetected: Wallet[] = [];

    wallets.forEach((wallet) => {
      if (wallet.readyState === WalletReadyState.NotDetected) {
        notDetected.push(wallet);
      } else if (wallet.readyState === WalletReadyState.Loadable) {
        loadable.push(wallet);
      } else if (wallet.readyState === WalletReadyState.Installed) {
        installed.push(wallet);
      }
    });

    const orderedWallets = [...installed, ...loadable, ...notDetected];
    return [
      orderedWallets.slice(0, featuredWallets),
      orderedWallets.slice(featuredWallets),
    ];
  }, [wallets, featuredWallets]);

  const handleWalletClick = useCallback(
    (event: SyntheticEvent, walletName: WalletName) => {
      select(walletName);
      setOpen(false);
    },
    [select, setOpen]
  );

  const handleExpandClick = useCallback(
    () => setExpanded(!expanded),
    [setExpanded, expanded]
  );

  return (
    <Modal isOpen={isOpen} onClose={() => setOpen(false)} {...props}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>
          <List>
            {featured.map((wallet) => (
              <WalletListItem
                key={wallet.adapter.name}
                onClick={(event) =>
                  handleWalletClick(event, wallet.adapter.name)
                }
                wallet={wallet}
              />
            ))}
            {more.length ? (
              <>
                <Collapse in={expanded} unmountOnExit>
                  <List>
                    {more.map((wallet) => (
                      <WalletListItem
                        key={wallet.adapter.name}
                        onClick={(event) =>
                          handleWalletClick(event, wallet.adapter.name)
                        }
                        wallet={wallet}
                      />
                    ))}
                  </List>
                </Collapse>
                <ListItem>
                  <Button onClick={handleExpandClick}>
                    {expanded ? 'Less' : 'More'} options
                    {expanded ? (
                      <Icon as={ChevronsUpDownIcon} />
                    ) : (
                      <Icon as={ChevronsDownUpIcon} />
                    )}
                  </Button>
                </ListItem>
              </>
            ) : null}
          </List>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
