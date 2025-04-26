'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Logo from './Logo';
import { MotionButton } from './motion';

interface NavbarProps {
  onFreoBusClick?: () => void;
}

export default function Navbar({ onFreoBusClick }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isMarketplace = pathname === '/marketplace';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1E1E1E]/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        <div className="flex items-center justify-between h-14">
          {/* Left side - ONLY Logo */}
          <div className="flex-shrink-0">
            {isMarketplace ? (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => router.back()}
                  className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#2A2A2A] hover:bg-[#3A3A3A] transition-colors"
                  aria-label="Go back"
                >
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <Link href="/">
                  <Logo className="py-1.5" />
                </Link>
              </div>
            ) : (
              <Link href="/">
                <Logo className="py-1.5" />
              </Link>
            )}
          </div>

          {/* Right side - ALL Navigation Items */}
          {!isMarketplace && (
            <div className="flex items-center space-x-6">
              <MotionButton
                onClick={onFreoBusClick}
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-4 py-1.5 text-sm font-medium text-[#1E1E1E] bg-gradient-to-r from-[#FFC107] to-[#FFD700] rounded-full shadow-md hover:shadow-[#FFC107]/50 transition-all duration-200"
              >
                <span className="relative z-10 flex items-center">
                  <span className="mr-1">✨</span>
                  What's FreoBus
                </span>
              </MotionButton>
              <Link
                href="/marketplace"
                className="text-gray-300 hover:text-[#FFC107] transition-colors text-sm"
              >
                Web3 Shopping Mall
              </Link>
              <MotionButton
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-3 py-1.5 bg-gradient-to-r from-[#FFC107] to-[#FFD700] text-[#1E1E1E] rounded-lg text-sm font-medium hover:from-[#FFD700] hover:to-[#FFE44D] transition-all"
              >
                Connect Wallet
              </MotionButton>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
} 