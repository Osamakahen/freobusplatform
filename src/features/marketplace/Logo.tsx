'use client';

import React from 'react';
import { MotionDiv } from './motion';

interface LogoProps {
  className?: string;
}

export default function Logo({ className = '' }: LogoProps) {
  return (
    <MotionDiv
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`text-2xl font-bold text-[#FFC107] ${className}`}
    >
      FreoBus
    </MotionDiv>
  );
} 