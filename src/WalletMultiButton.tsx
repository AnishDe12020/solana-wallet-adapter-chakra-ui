import React, { useMemo } from 'react';
import {
  Button,
  ButtonProps,
  Icon,
  Menu,
  MenuItem,
  useDisclosure,
} from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { CopyIcon, LogOutIcon, ArrowLeftRight } from 'lucide-react';
import { WalletIcon } from './WalletIcon';
import { useWalletDialog } from './useWalletDialog';

export const WalletMultiButton = ({
  children,
  disabled,
  ...props
}: ButtonProps) => {
  const { publicKey, wallet, connected, connecting, connect, disconnect } =
    useWallet();

  // const {
  //   isOpen: isMenuOpen,
  //   onOpen: onMenuOpen,
  //   onClose: onMenuClose,
  // } = useDisclosure();

  const { setOpen } = useWalletDialog();

  const base58 = useMemo(() => publicKey?.toBase58(), [publicKey]);

  const content = useMemo(() => {
    if (children) return children;
    if (!wallet || !base58) return null;
    return `${base58.slice(0, 4)}..${base58.slice(-4)}`;
  }, [wallet, base58, children]);

  if (!wallet) {
    return (
      <Button onClick={() => setOpen(true)} {...props}>
        {children || 'Select Wallet'}
      </Button>
    );
  }

  const connectWalletContent = useMemo(() => {
    if (children) return children;
    if (connecting) return 'Connecting ...';
    if (connected) return 'Connected';
    if (wallet) return 'Connect';
    return 'Connect Wallet';
  }, [children, connecting, connected, wallet]);

  if (!base58) {
    return (
      <Button
        disabled={disabled || !wallet || connecting || connected}
        leftIcon={<WalletIcon wallet={wallet} />}
        onClick={() => connect().catch(() => {})}
        {...props}
      >
        {connectWalletContent}
      </Button>
    );
  }

  return (
    <>
      <Button
        {...props}
        leftIcon={<WalletIcon wallet={wallet} />}
        // onClick={onMenuOpen}
      >
        {content}
      </Button>
      {/* <Menu id="wallet-menu" isOpen={isMenuOpen} onClose={onMenuClose}>
        <MenuItem onClick={onMenuClose}>
          <Button
            startIcon={<WalletIcon wallet={wallet} />}
            onClick={onMenuClose}
            fullWidth
            {...props}
          >
            {wallet.adapter.name}
          </Button>
        </MenuItem>
        <MenuItem
          onClick={async () => {
            await navigator.clipboard.writeText(base58);
          }}
          icon={<Icon as={CopyIcon} />}
        >
          Copy address
        </MenuItem>
        <MenuItem
          onClick={() => {
            setOpen(true);
          }}
          icon={<Icon as={ArrowLeftRight} />}
        >
          Change wallet
        </MenuItem>
        <MenuItem
          onClick={() => {
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            disconnect().catch(() => {
              // Silently catch because any errors are caught by the context `onError` handler
            });
          }}
          icon={<Icon as={LogOutIcon} />}
        >
          Disconnect
        </MenuItem>
      </Menu> */}
    </>
  );
};
