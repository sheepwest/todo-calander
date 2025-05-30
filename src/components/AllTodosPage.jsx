import React, { useState } from 'react';
import AccordionSection from './AccordionSection';
import { SeedIcon } from './icons/SeedIcon';
import { SproutIcon } from './icons/SproutIcon';
import { FlowerIcon } from './icons/FlowerIcon';

export default function AllTodosPage({ todos, onToggle, onToggleAll, goMain }) {
  // 카테고리 분류
  const schedules = todos.filter((t) => t.type === '일정' && !t.completed);
  const todosOnly = todos.filter((t) => t.type === '할일' && !t.completed);
  const completed = todos.filter((t) => t.completed);

  // 전체 완료율
  const total = todos.length;
  const today = new Date().toISOString().slice(0, 10);
  const completedCnt = completed.length;
  const completionItems = todos.filter((t) => t.date === today);
  const completion =
    completionItems.length === 0
      ? 0
      : Math.round(
          (completionItems.filter((t) => t.completed).length /
            completionItems.length) *
            100
        );

  // 여러 개 펼칠 수 있도록 객체로 열림상태 관리
  const [openSections, setOpenSections] = useState({
    일정: true,
    할일: false,
    완료: false,
  });

  const toggleSection = (name) =>
    setOpenSections((prev) => ({ ...prev, [name]: !prev[name] }));

  // 아이콘 결정 함수
  function getAchievementIcon(completion) {
    if (completion < 30) return <SeedIcon size={38} />;
    if (completion < 80) return <SproutIcon size={38} />;
    return <FlowerIcon size={38} />;
  }

  // 원형 프로그레스바 설정
  const SIZE = 66;
  const STROKE = 7.5;
  const RADIUS = (SIZE - STROKE) / 2;
  const CIRCUM = 2 * Math.PI * RADIUS;
  const percent = completion > 100 ? 100 : completion < 0 ? 0 : completion;

  return (
    <div className="app-wrapper">
      <header>
        {/* 뒤로가기(메인으로) 버튼 */}
        <button onClick={goMain} aria-label="메인화면으로">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path
              d="M18 22L10 14L18 6"
              stroke="#388E3C"
              strokeWidth="2.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        {/* 달성도 원형 Progress + 중앙 아이콘 */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: SIZE,
              height: SIZE,
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width={SIZE} height={SIZE}>
              {/* 회색(배경) 원 */}
              <circle
                cx={SIZE / 2}
                cy={SIZE / 2}
                r={RADIUS}
                stroke="#D2EDC8"
                strokeWidth={STROKE}
                fill="none"
              />
              {/* 진행도(초록색) 원 */}
              <circle
                cx={SIZE / 2}
                cy={SIZE / 2}
                r={RADIUS}
                stroke="#4CAF50"
                strokeWidth={STROKE}
                fill="none"
                strokeDasharray={CIRCUM}
                strokeDashoffset={CIRCUM * (1 - percent / 100)}
                strokeLinecap="round"
                style={{
                  transition: 'stroke-dashoffset 0.7s',
                  transform: 'rotate(-90deg)',
                  transformOrigin: '50% 50%',
                }}
              />
            </svg>
            {/* 중앙 아이콘 */}
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
              }}
            >
              {getAchievementIcon(completion)}
            </div>
          </div>
        </div>
        {/* 오른쪽 빈 칸 (캘린더 버튼 제거) */}
        <div style={{ width: 28 }} />
      </header>
      {/* 퍼센트 텍스트가 필요하다면 여기에 추가 */}
      {/* <div style={{textAlign:'center', color:'#388e3c', fontWeight:700, fontSize:'1.05rem', marginBottom:'0.7rem'}}>{completion}%</div> */}
      {/* 아코디언 구역 */}
      <AccordionSection
        title="일정"
        isOpen={openSections['일정']}
        onToggle={() => toggleSection('일정')}
        items={schedules}
        onToggleItem={onToggle}
      />
      <AccordionSection
        title="할일"
        isOpen={openSections['할일']}
        onToggle={() => toggleSection('할일')}
        items={todosOnly}
        onToggleItem={onToggle}
      />
      <AccordionSection
        title="완료"
        isOpen={openSections['완료']}
        onToggle={() => toggleSection('완료')}
        items={completed}
        onToggleItem={onToggle}
      />
    </div>
  );
}
