import React, { useState } from 'react';

export function SproutIcon({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <path
        d="M18 28 Q18 18 24 15 Q19 17 18 24 Q17 17 12 15 Q18 18 18 28Z"
        fill="#5CC97B"
      />
      <ellipse cx="13" cy="13" rx="5" ry="2.2" fill="#A8E6B2" />
      <ellipse cx="23" cy="13" rx="5" ry="2.2" fill="#81E29B" />
    </svg>
  );
}
