// import React, { useState, useEffect } from "react";

// // Card Component (inside same file)
// const Card = ({ card, onClick, isFlipped, isMatched }) => {
//   return (
//     <div
//       onClick={onClick}
//       style={{
//         width: "80px",
//         height: "80px",
//         border: "1px solid black",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         fontSize: "24px",
//         cursor: "pointer",
//         backgroundColor: isMatched
//           ? "lightgreen"
//           : isFlipped
//           ? "white"
//           : "gray",
//       }}
//     >
//       {isFlipped || isMatched ? card.value : ""}
//     </div>
//   );
// };

// function App() {
//   const signals = ["👽", "🛸", "🚀", "🌌", "✨", "🪐", "☄️", "🔭"];

//   const [cards, setCards] = useState([]);
//   const [flippedCards, setFlippedCards] = useState([]);
//   const [matchedCards, setMatchedCards] = useState([]);
//   const [score, setScore] = useState(0);
//   const [time, setTime] = useState(0);
//   const [gameStarted, setGameStarted] = useState(false);

//   // Initialize + Shuffle Cards
//   useEffect(() => {
//     const duplicated = [...signals, ...signals];

//     const shuffled = duplicated
//       .map((item) => ({ value: item, id: Math.random() }))
//       .sort(() => Math.random() - 0.5);

//     setCards(shuffled);
//   }, []);

//   // Timer
//   useEffect(() => {
//     let interval;

//     if (gameStarted && matchedCards.length < 16) {
//       interval = setInterval(() => {
//         setTime((prev) => prev + 1);
//       }, 1000);
//     }

//     return () => clearInterval(interval);
//   }, [gameStarted, matchedCards]);

//   // Match / Mismatch Logic
//   useEffect(() => {
//     if (flippedCards.length === 2) {
//       const [first, second] = flippedCards;

//       if (cards[first].value === cards[second].value) {
//         // Match
//         setMatchedCards((prev) => [...prev, first, second]);
//         setScore((prev) => prev + 100);
//         setFlippedCards([]);
//       } else {
//         // Mismatch
//         setScore((prev) => prev - 10);

//         setTimeout(() => {
//           setFlippedCards([]);
//         }, 1000);
//       }
//     }
//   }, [flippedCards, cards]);

//   // Handle Click
//   const handleClick = (index) => {
//     if (!gameStarted) setGameStarted(true);

//     if (
//       flippedCards.length === 2 ||
//       flippedCards.includes(index) ||
//       matchedCards.includes(index)
//     ) {
//       return;
//     }

//     setFlippedCards((prev) => [...prev, index]);
//   };

//   const isGameComplete = matchedCards.length === 16;

//   const timeBonus = isGameComplete
//     ? Math.max(0, 500 - time * 5)
//     : 0;

//   return (
//     <div style={{ textAlign: "center", marginTop: "20px" }}>
//       <h1>👽 Alien Signal Decryption</h1>

//       <h3>Score: {score}</h3>
//       <h3>Time: {time}s</h3>

//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(4, 80px)",
//           gap: "10px",
//           justifyContent: "center",
//           marginTop: "20px",
//         }}
//       >
//         {cards.map((card, index) => (
//           <Card
//             key={card.id}
//             card={card}
//             onClick={() => handleClick(index)}
//             isFlipped={flippedCards.includes(index)}
//             isMatched={matchedCards.includes(index)}
//           />
//         ))}
//       </div>

//       {isGameComplete && (
//         <div style={{ marginTop: "20px", color: "green" }}>
//           <h2>🎉 Decryption Complete!</h2>
//           <h3>Final Score: {score + timeBonus}</h3>
//           <p>Time Bonus: {timeBonus}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

// task 3:

import { useState, useEffect } from "react";

// ─── Initial Data ─────────────────────────────────────────────────────────────

const INITIAL_TASKS = [
  { id: 1, text: "Read React documentation", isCompleted: false },
  { id: 2, text: "Build a small project", isCompleted: true },
  { id: 3, text: "Write lab report", isCompleted: false },
];

// ─── TaskItem ─────────────────────────────────────────────────────────────────

function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 16px",
        background: "#fff",
        borderRadius: 8,
        border: "1px solid #e5e7eb",
        marginBottom: 8,
      }}
    >
      <input
        type="checkbox"
        checked={task.isCompleted}
        onChange={() => onToggle(task.id)}
        style={{ width: 17, height: 17, cursor: "pointer", accentColor: "#2563eb" }}
      />
      <span
        style={{
          flex: 1,
          fontSize: 15,
          color: task.isCompleted ? "#9ca3af" : "#111827",
          textDecoration: task.isCompleted ? "line-through" : "none",
          transition: "all 0.2s",
        }}
      >
        {task.text}
      </span>
      <button
        onClick={() => onDelete(task.id)}
        style={{
          padding: "5px 12px",
          borderRadius: 6,
          border: "1px solid #fca5a5",
          background: "#fef2f2",
          color: "#dc2626",
          fontSize: 13,
          fontWeight: 600,
          cursor: "pointer",
          fontFamily: "inherit",
        }}
      >
        Delete
      </button>
    </li>
  );
}

// ─── TaskList ─────────────────────────────────────────────────────────────────

function TaskList({ tasks, onToggleTask, onDeleteTask }) {
  if (tasks.length === 0) {
    return (
      <p style={{ textAlign: "center", color: "#9ca3af", fontSize: 14, padding: "24px 0" }}>
        No tasks found.
      </p>
    );
  }
  return (
    <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggleTask}
          onDelete={onDeleteTask}
        />
      ))}
    </ul>
  );
}

// ─── FilterControls ───────────────────────────────────────────────────────────

function FilterControls({ currentFilter, onFilterChange }) {
  const filters = ["all", "active", "completed"];
  return (
    <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => onFilterChange(f)}
          style={{
            padding: "7px 18px",
            borderRadius: 6,
            border: "1px solid #d1d5db",
            background: currentFilter === f ? "#2563eb" : "#fff",
            color: currentFilter === f ? "#fff" : "#374151",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "inherit",
            textTransform: "capitalize",
            transition: "all 0.15s",
          }}
        >
          {f}
        </button>
      ))}
    </div>
  );
}

// ─── TaskInput ────────────────────────────────────────────────────────────────

function TaskInput({ onAddTask }) {
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (!text.trim()) return;
    onAddTask(text.trim());
    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleAdd();
  };

  return (
    <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter a new task..."
        style={{
          flex: 1,
          padding: "10px 14px",
          borderRadius: 8,
          border: "1px solid #d1d5db",
          fontSize: 14,
          fontFamily: "inherit",
          outline: "none",
          color: "#111827",
        }}
      />
      <button
        onClick={handleAdd}
        style={{
          padding: "10px 20px",
          borderRadius: 8,
          border: "none",
          background: "#2563eb",
          color: "#fff",
          fontSize: 14,
          fontWeight: 700,
          cursor: "pointer",
          fontFamily: "inherit",
        }}
      >
        Add Task
      </button>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  // Simulate loading initial tasks from an API
  useEffect(() => {
    const timer = setTimeout(() => {
      setTasks(INITIAL_TASKS);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleAddTask = (text) => {
    const newTask = { id: Date.now(), text, isCompleted: false };
    setTasks((prev) => [...prev, newTask]);
  };

  const handleToggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.isCompleted;
    if (filter === "completed") return task.isCompleted;
    return true;
  });

  const completedCount = tasks.filter((t) => t.isCompleted).length;

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #f3f4f6; font-family: 'Segoe UI', system-ui, sans-serif; min-height: 100vh; }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#f3f4f6", padding: "40px 16px" }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>

          {/* Header */}
          <div style={{ marginBottom: 24 }}>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111827", letterSpacing: "-0.5px" }}>
              Personal Task Manager
            </h1>
            {!loading && (
              <p style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>
                {completedCount} of {tasks.length} tasks completed
              </p>
            )}
          </div>

          {/* Card */}
          <div style={{ background: "#fff", borderRadius: 12, padding: 24, boxShadow: "0 1px 4px rgba(0,0,0,0.08)", border: "1px solid #e5e7eb" }}>

            <TaskInput onAddTask={handleAddTask} />

            <FilterControls currentFilter={filter} onFilterChange={setFilter} />

            {loading ? (
              <p style={{ textAlign: "center", color: "#6b7280", fontSize: 14, padding: "24px 0" }}>
                Loading tasks...
              </p>
            ) : (
              <TaskList
                tasks={filteredTasks}
                onToggleTask={handleToggleTask}
                onDeleteTask={handleDeleteTask}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}