import React, { useState } from 'react';
import Header from './components/Header';
import ProgressBar from './components/ProgressBar';
import TodoList from './components/TodoList';
import AddTodoButton from './components/AddTodoButton';
import AddTodoModal from './components/AddTodoModal';
import AllTodosPage from './components/AllTodosPage';
import CalendarPage from './components/CalendarPage';
import './style.css';

export default function App() {
  const today = new Date().toISOString().slice(0, 10);

  // 1. 반복 할일 '원본'은 1개만!
  const exerciseBase = {
    id: 101,
    title: '30분씩 운동',
    memo: '',
    date: '',
    type: '할일',
    repeat: true,
    repeatCycle: 'daily',
  };

  const mayPercent = [
    29, 55, 62, 99, 13, 19, 99, 22, 74, 68, 84, 53, 66, 72, 15, 35, 36, 74, 11,
    23, 44, 58, 67, 81, 33, 29, 75, 90, 10,
  ];

  // 2. 날짜별 완료 데이터만 별도 관리!
  // (원하는 날짜와 completed 값을 채우면 됩니다)
  const exerciseStats = [
    { date: '2025-05-01', completed: true },
    { date: '2025-05-02', completed: false },
    { date: '2025-05-03', completed: true },
    { date: '2025-05-04', completed: false },
    { date: '2025-05-05', completed: true },
    { date: '2025-05-06', completed: false },
    { date: '2025-05-07', completed: true },
    { date: '2025-05-08', completed: false },
    { date: '2025-05-09', completed: true },
    { date: '2025-05-10', completed: false },
    { date: '2025-05-11', completed: true },
    { date: '2025-05-12', completed: false },
    { date: '2025-05-13', completed: true },
    { date: '2025-05-14', completed: false },
    { date: '2025-05-15', completed: true },
    { date: '2025-05-16', completed: false },
    { date: '2025-05-17', completed: true },
    { date: '2025-05-18', completed: false },
    { date: '2025-05-19', completed: true },
    { date: '2025-05-20', completed: false },
    { date: '2025-05-21', completed: true },
    { date: '2025-05-22', completed: false },
    { date: '2025-05-23', completed: true },
    { date: '2025-05-24', completed: false },
    { date: '2025-05-25', completed: true },
    { date: '2025-05-26', completed: false },
    { date: '2025-05-27', completed: true },
    { date: '2025-05-28', completed: false },
    { date: '2025-05-29', completed: true },
  ];

  // 3. 일반 할일(예시)
  const initialTodos = [
    {
      id: 1,
      title: '책 읽기',
      completed: false,
      date: today,
      memo: '피와 기름',
      type: '일정',
    },
    {
      id: 2,
      title: '산책 나가기',
      completed: false,
      date: '2025-05-29',
      memo: '',
      type: '일정',
    },
    {
      id: 3,
      title: '자기주도 동아리',
      completed: true,
      date: today,
      memo: '',
      type: '일정',
    },
    {
      id: 4,
      title: '안방 청소',
      completed: false,
      date: '',
      memo: '',
      type: '할일',
    },
    exerciseBase, // 반복할일 '원본' 1개만
  ];

  const [todos, setTodos] = useState(initialTodos);
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState('main');

  // ================
  // 오늘의 할일: 일반 + 오늘의 반복할일(하나)
  const repeatToday = exerciseStats.find((stat) => stat.date === today);
  const todaysTodos = [
    ...todos.filter((t) => t.date === today),
    ...todos.filter((t) => !t.date),
  ];
  const sortedTodos = [...todaysTodos].sort(
    (a, b) => a.completed - b.completed
  );

  // 달성도 계산: 오늘 날짜 중 date가 있는 할일들만(반복도 포함)
  const todosWithDate = todos.filter((t) => t.date);
  // + 반복할일(오늘)도 추가
  const completionItems = [
    ...todosWithDate.filter((t) => t.date === today),
    ...(repeatToday
      ? [{ ...exerciseBase, date: today, completed: repeatToday.completed }]
      : []),
  ];
  const completion =
    completionItems.length === 0
      ? 0
      : Math.round(
          (completionItems.filter((t) => t.completed).length /
            completionItems.length) *
            100
        );

  // ---------------------------
  // 할일 추가
  const addTodo = (todo) =>
    setTodos((prev) => [
      ...prev,
      { ...todo, id: Date.now(), completed: false },
    ]);

  // 할일 체크 토글
  const toggleTodo = (id) =>
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );

  // 전체 할일 체크 토글
  const toggleAll = () => {
    setTodos((prev) =>
      prev.map((t) => ({ ...t, completed: !prev.every((tt) => tt.completed) }))
    );
  };

  // -------------------------
  // AllTodosPage, CalendarPage로 넘길 때도 중복 없이
  if (page === 'all') {
    // AllTodosPage에서 반복할일은 '원본' 1개만, 날짜별 반복인스턴스는 필요하면 exerciseStats로 전달
    return (
      <AllTodosPage
        todos={todos}
        repeatStats={exerciseStats}
        repeatBase={exerciseBase}
        onToggle={toggleTodo}
        onToggleAll={toggleAll}
        goMain={() => setPage('main')}
        goCalendar={() => setPage('calendar')}
      />
    );
  }

  if (page === 'calendar') {
    // CalendarPage도 반복할일 인스턴스 X, '원본' + stats만 전달
    return (
      <CalendarPage
        todos={todos}
        repeatStats={exerciseStats}
        repeatBase={exerciseBase}
        mayPercent={mayPercent}
        goMain={() => setPage('main')}
      />
    );
  }

  // ---- 메인(오늘의 할일) ----
  return (
    <div className="app-wrapper">
      <Header
        onMenuClick={() => setPage('all')}
        onCalendarClick={() => setPage('calendar')}
      />
      <ProgressBar completion={completion} />
      <TodoList todos={sortedTodos} onToggle={toggleTodo} />
      <AddTodoButton onClick={() => setShowModal(true)} />
      <AddTodoModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onAdd={addTodo}
      />
    </div>
  );
}
