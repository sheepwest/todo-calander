import React, { useState } from "react";

export function FlowerIcon({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="20" r="8" fill="#F9A8D4" />
      <ellipse cx="18" cy="13" rx="3" ry="5.8" fill="#F9A8D4" opacity="0.7" />
      <ellipse
        cx="11.3"
        cy="23.6"
        rx="3"
        ry="5.8"
        fill="#F9A8D4"
        opacity="0.7"
        transform="rotate(-50 11.3 23.6)"
      />
      <ellipse
        cx="24.7"
        cy="23.6"
        rx="3"
        ry="5.8"
        fill="#F9A8D4"
        opacity="0.7"
        transform="rotate(50 24.7 23.6)"
      />
      <circle cx="18" cy="20" r="2.5" fill="#FDE68A" />
    </svg>
  );
}
