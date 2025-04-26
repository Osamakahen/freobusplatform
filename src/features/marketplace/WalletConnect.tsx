import { useState } from 'react';

export default function WalletConnect() {
  const [isConnected, setIsConnected] = useState(false);

  const toggleConnection = () => {
    setIsConnected(!isConnected);
  };

  return (
    <div>
      <button
        onClick={toggleConnection}
        className={`px-4 py-2 ${
          isConnected ? 'bg-red-600 hover:bg-red-700' : 'bg-purple-600 hover:bg-purple-700'
        } text-white rounded-lg font-semibold transition-colors`}
      >
        {isConnected ? 'Disconnect' : 'Connect Wallet'}
      </button>
    </div>
  );
} 