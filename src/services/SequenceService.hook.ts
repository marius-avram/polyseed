import React, { useEffect, useCallback } from 'react'
import { ethers } from 'ethers'
import { sequence } from '0xsequence'
import Web3Modal from '@0xsequence/web3modal'
import WalletConnect from '@walletconnect/web3-provider'
import { configureLogger } from '@0xsequence/utils'
import { useAppContext } from '../context/App.context'

configureLogger({ logLevel: 'DEBUG' })

let providerOptions: any = {
  walletconnect: {
    package: WalletConnect,
    options: {
      infuraId: 'xxx-your-infura-id-here'
    }
  }
}

if (!window?.ethereum?.isSequence) {
  providerOptions = {
    ...providerOptions,
    sequence: {
      package: sequence,
      options: {
        appName: 'Polyseed',
        defaultNetwork: 'polygon testnet'
      }
    }
  }
}

const web3Modal = new Web3Modal({
  providerOptions,
  cacheProvider: true
});

export default function useSequenceService() {
  const appContext = useAppContext();

  const connectWallet =  useCallback(() => {
    web3Modal.connect().then((wallet: any) => {

      const provider = new ethers.providers.Web3Provider(wallet);

      if (wallet.sequence) {
        ;(provider as any).sequence = wallet.sequence
      }

      appContext.setSequenceProvider(provider);
    });

  }, [appContext.setSequenceProvider]);

  const disconnectWallet = useCallback(() => {
    web3Modal.clearCachedProvider();

    const provider = appContext.state.sequenceProvider;
    if (provider && (provider as any).sequence) {
      const wallet = (provider as any).sequence as sequence.Wallet;
      wallet.disconnect();
    }

    appContext.setSequenceProvider(null);
    appContext.setNetwork(null);
    appContext.setAddress(null);
  }, [appContext.setSequenceProvider, appContext.setNetwork, appContext.setAddress]);

  const sendAmount = useCallback((toAddress: string, amount: string, campaignId: string) => {
    if (appContext.state.sequenceProvider != null) {
      const signer = appContext.state.sequenceProvider.getSigner() // select DefaultChain signer by default
      const textEncoder = new TextEncoder();
      const transactionData = 'polyseed-' + campaignId;
      console.log("transactionData: " + transactionData);

      const transaction = {
        gasLimit: '0x55555',
        to: toAddress,
        value: ethers.utils.parseEther(amount),
        data: '0x'
      }

      signer.sendTransaction(transaction);
    }
    else {
      console.error("Sequence provider not properly inited");
    }
  }, [appContext.state.sequenceProvider]);

  useEffect(() => {
    const provider = appContext.state.sequenceProvider;
    if (provider != null) {
      provider.getNetwork().then((currentNetwork: ethers.providers.Network) => {
        appContext.setNetwork(currentNetwork.name);
      })
      const signer = provider.getSigner();
      signer.getAddress().then((currentAddress: string) => {
        appContext.setAddress(currentAddress);
      });
    }
  }, [appContext.state.sequenceProvider]);

  return {
    connectWallet,
    disconnectWallet,
    sendAmount,
  }

}