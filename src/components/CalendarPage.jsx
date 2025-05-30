import React, { useState } from 'react';
import { SeedIcon } from './icons/SeedIcon';
import { SproutIcon } from './icons/SproutIcon';
import { FlowerIcon } from './icons/FlowerIcon';

// 반복 할일 선택 모달
function SelectRepeatTodoModal({ open, todos, onSelect, onShowAll, onClose }) {
  if (!open) return null;
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0,0,0,0.23)',
        zIndex: 2000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '85vw',
          maxWidth: 340,
          background: '#fff',
          borderRadius: 15,
          padding: '2rem 1.3rem 1.5rem 1.3rem',
          boxShadow: '0 2px 16px #bbb9',
          position: 'relative',
        }}
      >
        <div
          style={{
            fontWeight: 700,
            fontSize: '1.16rem',
            color: '#388e3c',
            marginBottom: '1.1rem',
          }}
        >
          반복 할일 선택
        </div>
        {todos.length === 0 ? (
          <div
            style={{ color: '#aaa', textAlign: 'center', margin: '1.6rem 0' }}
          >
            반복 설정된 할일이 없습니다.
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              marginBottom: '1.6rem',
            }}
          >
            {todos.map((todo) => (
              <button
                key={todo.id}
                onClick={() => onSelect(todo)}
                style={{
                  background: '#e9f6e6',
                  color: '#388e3c',
                  border: 'none',
                  borderRadius: 8,
                  fontWeight: 600,
                  fontSize: '1.07rem',
                  padding: '0.65rem 0.7rem',
                  cursor: 'pointer',
                  textAlign: 'center',
                }}
              >
                {todo.title}
              </button>
            ))}
            {/* 전체 할일 보기 버튼 */}
            <button
              onClick={onShowAll}
              style={{
                background: '#388e3c',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                fontWeight: 600,
                fontSize: '1.07rem',
                padding: '0.65rem 0.7rem',
                cursor: 'pointer',
                textAlign: 'center',
              }}
            >
              전체 할일 보기
            </button>
          </div>
        )}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={onClose}
            style={{
              background: '#eee',
              color: '#388e3c',
              border: 'none',
              borderRadius: 7,
              padding: '0.7rem 1.4rem',
              fontWeight: 600,
              fontSize: '1.04rem',
            }}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

// 월 달력 배열 생성 함수
function getMonthMatrix(year, month) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const matrix = [];
  let week = [];
  let day = 1;
  for (let i = 0; i < firstDay.getDay(); i++) week.push(null);
  while (day <= lastDay.getDate()) {
    week.push(day);
    if (week.length === 7) {
      matrix.push(week);
      week = [];
    }
    day++;
  }
  while (week.length < 7) week.push(null);
  if (week.some((v) => v !== null)) matrix.push(week);
  return matrix;
}

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const daysKor = ['일', '월', '화', '수', '목', '금', '토'];

export default function CalendarPage({ todos, goMain, mayPercent }) {
  const today = new Date();
  const [curYear, setCurYear] = useState(today.getFullYear());
  const [curMonth, setCurMonth] = useState(today.getMonth());

  // 반복설정된 할일만 추출
  const repeatedTodos = todos.filter((t) => t.repeat && t.repeatCycle);

  // 모달 오픈/선택상태
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  // 달 이동
  const changeMonth = (delta) => {
    let m = curMonth + delta;
    let y = curYear;
    if (m < 0) {
      y--;
      m = 11;
    }
    if (m > 11) {
      y++;
      m = 0;
    }
    setCurYear(y);
    setCurMonth(m);
  };

  const monthMatrix = getMonthMatrix(curYear, curMonth);

  // 전체 달성도: 날짜별 씨앗/새싹/꽃 (mayPercent 적용)
  function getCompletion(y, m, d) {
    // JS에서 5월은 4, 2025년 5월일 때만 mayPercent 적용
    if (
      mayPercent &&
      y === 2025 &&
      m === 4 &&
      d >= 1 &&
      d <= mayPercent.length
    ) {
      return mayPercent[d - 1];
    }
    // 이외에는 기존 로직
    const dateStr = `${y}-${String(m + 1).padStart(2, '0')}-${String(
      d
    ).padStart(2, '0')}`;
    const dayTodos = todos.filter((t) => t.date === dateStr);
    if (dayTodos.length === 0) return null;
    const done = dayTodos.filter((t) => t.completed).length;
    return Math.round((done / dayTodos.length) * 100);
  }
  function getIcon(completion) {
    if (completion === null) return null;
    if (completion < 30) return <SeedIcon size={18} />;
    if (completion < 80) return <SproutIcon size={18} />;
    return <FlowerIcon size={18} />;
  }

  // 반복 할일(특정)만 표시: 날짜별 씨앗/꽃
  function getDoneForSelected(y, m, d) {
    if (!selectedTodo) return null;
    const dateStr = `${y}-${String(m + 1).padStart(2, '0')}-${String(
      d
    ).padStart(2, '0')}`;
    return todos.some(
      (t) => t.id === selectedTodo.id && t.date === dateStr && t.completed
    );
  }
  function getIconByDone(done) {
    if (done === null) return null;
    return done ? <FlowerIcon size={18} /> : <SeedIcon size={18} />;
  }

  return (
    <div className="app-wrapper">
      <header>
        {/* 뒤로가기 */}
        <button onClick={goMain} aria-label="메인화면">
          <svg width={28} height={28} fill="none">
            <path
              d="M18 22L10 14L18 6"
              stroke="#388E3C"
              strokeWidth="2.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        {/* 월 이동 */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <button
            onClick={() => changeMonth(-1)}
            aria-label="이전 달"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <svg width={20} height={20}>
              <path
                d="M13 5L7 10L13 15"
                stroke="#388E3C"
                strokeWidth={2.2}
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <span
            style={{
              fontSize: '1.2rem',
              fontWeight: 700,
              color: '#388e3c',
              margin: '0 1.2rem',
            }}
          >
            {monthNames[curMonth]}
          </span>
          <button
            onClick={() => changeMonth(1)}
            aria-label="다음 달"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <svg width={20} height={20}>
              <path
                d="M7 5L13 10L7 15"
                stroke="#388E3C"
                strokeWidth={2.2}
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <div style={{ width: 28 }} />
      </header>

      <div
        style={{
          background: '#fff',
          borderRadius: 18,
          padding: '1.1rem 0.7rem 1.7rem 0.7rem',
          margin: '1.2rem 1.1rem',
        }}
      >
        {/* 요일 표시 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            marginBottom: '0.5rem',
            color: '#98b893',
            fontWeight: 'bold',
          }}
        >
          {daysKor.map((day) => (
            <div key={day} style={{ width: 30, textAlign: 'center' }}>
              {day}
            </div>
          ))}
        </div>
        {/* 날짜/할일 달성도 표시 */}
        {monthMatrix.map((week, wi) => (
          <div
            key={wi}
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              marginBottom: '0.25rem',
            }}
          >
            {week.map((d, di) => {
              if (!d) return <div key={di} style={{ width: 30, height: 36 }} />;
              // 모드에 따라 달성도/완료여부 표시
              if (selectedTodo) {
                const done = getDoneForSelected(curYear, curMonth, d);
                return (
                  <div
                    key={di}
                    style={{
                      width: 30,
                      height: 36,
                      background: done !== null ? '#e2f2dc' : '#f8f7f3',
                      borderRadius: 9,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      color: '#388e3c',
                      position: 'relative',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '0.78rem',
                        marginBottom: '0.01rem',
                        lineHeight: '1.05',
                      }}
                    >
                      {d}
                    </div>
                    <div style={{ marginTop: '-2px' }}>
                      {getIconByDone(done)}
                    </div>
                  </div>
                );
              } else {
                // 전체 할일(달성도) 모드 (5월만 mayPercent 적용!)
                const comp = getCompletion(curYear, curMonth, d);
                return (
                  <div
                    key={di}
                    style={{
                      width: 30,
                      height: 36,
                      background: comp !== null ? '#e2f2dc' : '#f8f7f3',
                      borderRadius: 9,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      color: '#388e3c',
                      position: 'relative',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '0.78rem',
                        marginBottom: '0.01rem',
                        lineHeight: '1.05',
                      }}
                    >
                      {d}
                    </div>
                    <div style={{ marginTop: '-2px' }}>{getIcon(comp)}</div>
                  </div>
                );
              }
            })}
          </div>
        ))}
      </div>

      {/* 반복 할일 선택 모달 */}
      <SelectRepeatTodoModal
        open={modalOpen}
        todos={repeatedTodos}
        onSelect={(todo) => {
          setSelectedTodo(todo);
          setModalOpen(false);
        }}
        onShowAll={() => {
          setSelectedTodo(null);
          setModalOpen(false);
        }}
        onClose={() => setModalOpen(false)}
      />

      {/* 아래 초록 버튼: 클릭시 모달 오픈, 텍스트는 선택 반영 */}
      <div style={{ textAlign: 'center', margin: '1.8rem 0' }}>
        <button
          style={{
            background: '#65b967',
            color: '#fff',
            border: 'none',
            borderRadius: 12,
            padding: '1rem 2.2rem',
            fontWeight: 'bold',
            fontSize: '1.12rem',
            boxShadow: '0 2px 12px rgba(90,150,90,0.10)',
          }}
          onClick={() => setModalOpen(true)}
        >
          {selectedTodo ? selectedTodo.title : '특정 할일'}
        </button>
      </div>
    </div>
  );
}
