import React, { useState } from "react";

export function SeedIcon({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <ellipse cx="18" cy="23" rx="8" ry="11" fill="#8B5C2C" />
      <ellipse cx="18" cy="26" rx="5" ry="3" fill="#633A16" opacity="0.8"/>
      <ellipse cx="21" cy="19" rx="2.2" ry="1.3" fill="#D2B48C" opacity="0.6"/>
    </svg>
  );
}
