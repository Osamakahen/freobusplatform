import React, { createContext, useContext, useEffect, useState } from 'react';
import { WalletState, WalletProvider, WalletEvent } from '../types/wallet';
import { walletLogger } from '../services/walletLogger';

interface WalletContextType {
  state: WalletState;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  sendTransaction: (transaction: any) => Promise<any>;
  getBalance: (address: string) => Promise<string>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<WalletState>({
    isConnected: false,
    address: null,
    chainId: null,
    balance: null,
    error: null
  });

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
        provider.removeAllListeners();
      };
    }
  }, []);

  return (
    <WalletContext.Provider
      value={{
        state,
        connect,
        disconnect,
        sendTransaction,
        getBalance
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}; 