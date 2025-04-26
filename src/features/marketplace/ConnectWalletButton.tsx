'use client';

import React from 'react';

export const ConnectWalletButton: React.FC = () => {
  return (
    <button
      className="px-4 py-2 bg-[#FFC107] text-[#1E1E1E] rounded-lg font-medium hover:bg-[#FFD700] transition-colors"
      onClick={() => console.log('Connect wallet clicked')}
    >
      Connect Wallet
    </button>
  );
}; 