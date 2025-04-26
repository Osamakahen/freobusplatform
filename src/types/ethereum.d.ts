interface EthereumProvider {
  request: (args: { method: string; params?: any[] }) => Promise<any>;
  on: (event: string, callback: (params: any) => void) => void;
  removeAllListeners: () => void;
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

export {}; 