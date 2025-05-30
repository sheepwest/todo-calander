import React from 'react';

// props에 onMenuClick 추가!
export default function Header({ onMenuClick, onCalendarClick }) {
  // 오늘 날짜 MM/DD 포맷 (이전 안내 코드 활용)
  const getTodayString = () => {
    const now = new Date();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    return `${month}/${day}`;
  };

  return (
    <header>
      {/* 햄버거(메뉴) 아이콘 */}
      <button onClick={onMenuClick} aria-label="전체 할일 보기">
        <svg
          width={28}
          height={28}
          fill="none"
          stroke="#388E3C"
          strokeWidth={2}
        >
          <rect x="5" y="8" width="18" height="2" rx="1" fill="#388E3C" />
          <rect x="5" y="14" width="18" height="2" rx="1" fill="#388E3C" />
          <rect x="5" y="20" width="18" height="2" rx="1" fill="#388E3C" />
        </svg>
      </button>
      {/* 오늘 날짜 */}
      <div className="header-title">{getTodayString()}</div>
      {/* 캘린더 아이콘 */}
      <button onClick={onCalendarClick} aria-label="캘린더 페이지로 이동">
        <svg
          width={28}
          height={28}
          fill="none"
          stroke="#388E3C"
          strokeWidth={2}
        >
          <rect
            x="6"
            y="8"
            width="16"
            height="12"
            rx="3"
            fill="#388E3C"
            opacity="0.1"
          />
          <rect x="6" y="8" width="16" height="12" rx="3" stroke="#388E3C" />
          <rect x="9" y="12" width="2" height="2" fill="#388E3C" />
          <rect x="13" y="12" width="2" height="2" fill="#388E3C" />
          <rect x="17" y="12" width="2" height="2" fill="#388E3C" />
        </svg>
      </button>
    </header>
  );
}
