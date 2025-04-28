import React, { createContext, useContext, useEffect, useState } from 'react';
import { WalletState, WalletProvider, WalletEvent } from '../types/wallet';
import { walletLogger } from '../services/walletLogger';

interface EthereumProvider extends WalletProvider {
  request: (args: { method: string; params?: any[] }) => Promise<any>;
  on: (eventName: string, handler: (...args: any[]) => void) => void;
  removeAllListeners: (eventName: string) => void;
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

interface WalletContextType {
  state: WalletState;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  signMessage: (message: string) => Promise<string>;
  sendTransaction: (transaction: any) => Promise<any>;
  getBalance: (address: string) => Promise<string>;
}

const WalletContext = createContext<WalletContextType | null>(null);

export const WalletContextProvider = ({ children }: { children: any }) => {
  const [state, setState] = useState({
    isConnected: false,
    address: null,
    chainId: null,
    balance: null,
    error: null
  } as WalletState);

  const handleWalletEvent = (event: WalletEvent, data?: any) => {
    switch (event) {
      case 'connect':
        setState(prev => ({
          ...prev,
          isConnected: true,
          address: data.address,
          chainId: data.chainId,
          error: null
        }));
        walletLogger.logConnection(data.address);
        break;
      case 'disconnect':
        setState(prev => ({
          ...prev,
          isConnected: false,
          address: null,
          chainId: null,
          balance: null,
          error: null
        }));
        walletLogger.logDisconnection();
        break;
      case 'chainChanged':
        setState(prev => ({
          ...prev,
          chainId: data.chainId
        }));
        break;
      case 'accountsChanged':
        setState(prev => ({
          ...prev,
          address: data.address
        }));
        break;
      case 'error':
        setState(prev => ({
          ...prev,
          error: data.message
        }));
        walletLogger.logError({
          code: data.code,
          message: data.message,
          details: data.details
        });
        break;
    }
  };

  const connect = async () => {
    try {
      // Implementation will depend on the specific wallet provider
      const provider = window.ethereum;
      if (!provider) {
        throw new Error('No wallet provider found');
      }

      const accounts = await provider.request({ method: 'eth_requestAccounts' });
      const chainId = await provider.request({ method: 'eth_chainId' });

      handleWalletEvent('connect', {
        address: accounts[0],
        chainId: parseInt(chainId)
      });
    } catch (error) {
      handleWalletEvent('error', {
        code: 500,
        message: error instanceof Error ? error.message : 'Failed to connect wallet'
      });
    }
  };

  const disconnect = async () => {
    handleWalletEvent('disconnect');
  };

  const sendTransaction = async (transaction: any) => {
    try {
      const provider = window.ethereum;
      if (!provider) {
        throw new Error('No wallet provider found');
      }

      const txHash = await provider.request({
        method: 'eth_sendTransaction',
        params: [transaction]
      });

      return txHash;
    } catch (error) {
      handleWalletEvent('error', {
        code: 500,
        message: error instanceof Error ? error.message : 'Failed to send transaction'
      });
      throw error;
    }
  };

  const getBalance = async (address: string) => {
    try {
      const provider = window.ethereum;
      if (!provider) {
        throw new Error('No wallet provider found');
      }

      const balance = await provider.request({
        method: 'eth_getBalance',
        params: [address, 'latest']
      });

      return balance;
    } catch (error) {
      handleWalletEvent('error', {
        code: 500,
        message: error instanceof Error ? error.message : 'Failed to get balance'
      });
      throw error;
    }
  };

  const signMessage = async (message: string) => {
    try {
      const provider = window.ethereum;
      if (!provider) {
        throw new Error('No wallet provider found');
      }

      const signature = await provider.request({
        method: 'personal_sign',
        params: [message, state.address]
      });

      return signature;
    } catch (error) {
      handleWalletEvent('error', {
        code: 500,
        message: error instanceof Error ? error.message : 'Failed to sign message'
      });
      throw error;
    }
  };

  useEffect(() => {
    const provider = window.ethereum;
    if (provider) {
      provider.on('accountsChanged', (accounts: string[]) => {
        handleWalletEvent('accountsChanged', { address: accounts[0] });
      });

      provider.on('chainChanged', (chainId: string) => {
        handleWalletEvent('chainChanged', { chainId: parseInt(chainId) });
      });

      return () => {
        provider.removeAllListeners('accountsChanged');
        provider.removeAllListeners('chainChanged');
      };
    }
  }, []);

  return (
    <WalletContext.Provider value={{
      state,
      connect,
      disconnect,
      sendTransaction,
      getBalance,
      signMessage
    }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletContextProvider');
  }
  return context;
}; 