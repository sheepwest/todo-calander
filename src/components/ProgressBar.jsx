import React from "react";
import { SeedIcon } from "./icons/SeedIcon";
import { SproutIcon } from "./icons/SproutIcon";
import { FlowerIcon } from "./icons/FlowerIcon";

export default function ProgressBar({ completion }) {
  const WIDTH = 340;
  const HEIGHT = 170;
  const RADIUS = 140;
  const CENTER_X = WIDTH / 2;
  const CENTER_Y = HEIGHT;
  const startX = CENTER_X - RADIUS;
  const endX = CENTER_X + RADIUS;

  // %에 따라 아이콘
  function getAchievementIcon(completion) {
    if (completion < 30) return <SeedIcon size={88} />;
    if (completion < 80) return <SproutIcon size={88} />;
    return <FlowerIcon size={88} />;
  }

  // % 수치 위치 (더 위, 더 작게)
  const percentX = CENTER_X;
  const percentY = CENTER_Y - RADIUS - 11; // 더 위 (11px 올림)

  return (
    <div className="progress-container" style={{
      width: WIDTH, margin: "0 auto", marginTop: "2.5rem", marginBottom: "2.5rem", position: "relative"
    }}>
      <div className="progress-bar" style={{
        width: WIDTH, height: HEIGHT, position: "relative"
      }}>
        <svg width={WIDTH} height={HEIGHT}>
          {/* 배경 반원 */}
          <path
            d={`M${startX},${CENTER_Y} A${RADIUS},${RADIUS} 0 0,1 ${endX},${CENTER_Y}`}
            fill="none"
            stroke="#D2EDC8"
            strokeWidth="22"
            opacity="0.35"
          />
          {/* 달성도 반원 */}
          <path
            d={`M${startX},${CENTER_Y} A${RADIUS},${RADIUS} 0 0,1 ${endX},${CENTER_Y}`}
            fill="none"
            stroke="#4CAF50"
            strokeWidth="22"
            strokeDasharray={Math.PI * RADIUS}
            strokeDashoffset={Math.PI * RADIUS * (1 - completion / 100)}
            style={{ transition: "stroke-dashoffset 0.6s" }}
            strokeLinecap="round"
          />
          {/* % 텍스트 (더 위, 더 작게) */}
          <text
            x={percentX}
            y={percentY}
            textAnchor="middle"
            alignmentBaseline="middle"
            fontSize="0.95rem"
            fill="#388e3c"
            fontWeight="bold"
            letterSpacing="-0.5px"
            style={{ userSelect: "none" }}
          >
            {completion}%
          </text>
        </svg>
        {/* 내부 중앙, 큰 아이콘 (더 아래로!) */}
        <div style={{
          position: "absolute",
          left: "50%",
          top: "74%",  // 74%로 더 아래
          transform: "translate(-50%, -50%)",
          zIndex: 2,
          pointerEvents: "none"
        }}>
          {getAchievementIcon(completion)}
        </div>
      </div>
    </div>
  );
}
