/* eslint-disable import/no-relative-packages */
import Head from 'next/head';
import { Container, Heading } from '@chakra-ui/react';
import {
  WalletDialog,
  WalletMultiButton,
} from 'solana-wallet-adapter-chakra-ui';

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container as="main">
        <Heading>Solana Wallet Adapter Chakra UI</Heading>

        <WalletDialog />

        <WalletMultiButton />
      </Container>
    </>
  );
}
