import React, { useState } from 'react';

const REPEAT_OPTIONS = [
  { key: 'daily', label: '매일' },
  { key: 'weekly', label: '매주' },
  { key: 'monthly', label: '매월' },
  { key: 'yearly', label: '매년' },
];

export default function AddTodoModal({ open, onClose, onAdd }) {
  const todayStr = new Date().toISOString().slice(0, 10);

  const [title, setTitle] = useState('');
  const [dateOn, setDateOn] = useState(true); // 날짜선택 체크박스
  const [date, setDate] = useState(todayStr); // 날짜 입력란
  const [memo, setMemo] = useState('');
  const [repeat, setRepeat] = useState(false); // 반복설정 체크박스
  const [repeatCycle, setRepeatCycle] = useState(''); // 반복 주기

  if (!open) return null;

  const handleAdd = () => {
    if (!title.trim()) return;
    const newTodo = {
      title,
      memo,
      date: dateOn ? date : '',
      type: dateOn ? '일정' : '할일',
      repeat,
      repeatCycle: repeat ? repeatCycle : '', // 반복설정 안 했으면 빈 문자열
    };
    onAdd(newTodo);

    // 입력값 초기화
    setTitle('');
    setDateOn(true);
    setDate(todayStr);
    setMemo('');
    setRepeat(false);
    setRepeatCycle('');
    onClose();
  };

  return (
    <div
      className="modal-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0,0,0,0.20)',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        className="modal"
        style={{
          width: '90vw',
          maxWidth: 380,
          background: '#fff',
          borderRadius: 18,
          padding: '2rem 1.3rem 1.4rem 1.3rem',
          boxShadow: '0 2px 20px #bbb8',
          position: 'relative',
        }}
      >
        <h3
          style={{
            margin: 0,
            marginBottom: '1.2rem',
            fontWeight: 700,
            color: '#388E3C',
            fontSize: '1.18rem',
          }}
        >
          할일 입력
        </h3>

        {/* 할일 이름 */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="할일 이름"
          style={{
            width: '80%',
            fontSize: '1rem',
            padding: '0.7rem',
            marginBottom: '1.1rem',
            border: '1.5px solid #d2edc8',
            borderRadius: 9,
          }}
        />

        {/* 날짜 선택 체크박스 */}
        <div style={{ marginBottom: '1.1rem' }}>
          <label
            style={{ fontWeight: 600, fontSize: '0.97rem', color: '#388E3C' }}
          >
            <input
              type="checkbox"
              checked={dateOn}
              onChange={() => setDateOn((on) => !on)}
              style={{ marginRight: '0.7rem' }}
            />
            날짜 선택
          </label>
          {dateOn && (
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{
                display: 'block',
                marginTop: '0.5rem',
                fontSize: '1rem',
                padding: '0.45rem',
                borderRadius: 7,
                border: '1px solid #e0e8d0',
              }}
            />
          )}
        </div>

        {/* 반복 체크박스 + 주기 선택 버튼 */}
        <div style={{ marginBottom: '1.1rem' }}>
          <label
            style={{ fontWeight: 600, fontSize: '0.97rem', color: '#388E3C' }}
          >
            <input
              type="checkbox"
              checked={repeat}
              onChange={() => setRepeat((r) => !r)}
              style={{ marginRight: '0.7rem' }}
            />
            반복 설정
          </label>
          {repeat && (
            <div
              style={{ display: 'flex', gap: '0.6rem', marginTop: '0.7rem' }}
            >
              {REPEAT_OPTIONS.map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setRepeatCycle(opt.key)}
                  style={{
                    background: repeatCycle === opt.key ? '#388e3c' : '#e9f6e6',
                    color: repeatCycle === opt.key ? '#fff' : '#388e3c',
                    border: 'none',
                    borderRadius: 7,
                    fontWeight: 600,
                    padding: '0.38rem 1.13rem',
                    cursor: 'pointer',
                    fontSize: '1.02rem',
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 메모 */}
        <textarea
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="메모 (선택)"
          rows={2}
          style={{
            width: '80%',
            fontSize: '1rem',
            padding: '0.7rem',
            border: '1.5px solid #e0e8d0',
            borderRadius: 8,
            marginBottom: '1.2rem',
          }}
        />

        {/* 하단 버튼 */}
        <div
          style={{ display: 'flex', justifyContent: 'flex-end', gap: '1.1rem' }}
        >
          <button
            onClick={onClose}
            style={{
              background: '#eee',
              color: '#388E3C',
              border: 'none',
              borderRadius: 7,
              padding: '0.7rem 1.4rem',
              fontWeight: 600,
              fontSize: '1.05rem',
            }}
          >
            취소
          </button>
          <button
            onClick={handleAdd}
            style={{
              background: '#65b967',
              color: '#fff',
              border: 'none',
              borderRadius: 7,
              padding: '0.7rem 1.4rem',
              fontWeight: 600,
              fontSize: '1.05rem',
            }}
          >
            추가
          </button>
        </div>
      </div>
    </div>
  );
}
