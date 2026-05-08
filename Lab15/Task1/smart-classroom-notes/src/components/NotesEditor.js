import React, { useRef } from 'react';
import { useNotes } from '../context/NotesContext';

// ── Typing Indicator ────────────────────────────────────────────────────────
const TypingIndicator = () => {
  const { typingStudents } = useNotes();
  if (!typingStudents.length) return <div className="typing-bar" />;
  const names = typingStudents.map(s => s.name.split(' ')[0]).join(', ');
  return (
    <div className="typing-bar">
      <span className="typing-dots">
        <span /><span /><span />
      </span>
      {names} {typingStudents.length === 1 ? 'is' : 'are'} typing...
    </div>
  );
};

// ── History Bar ─────────────────────────────────────────────────────────────
const HistoryBar = () => {
  const { history, historyIndex } = useNotes();
  const offset  = Math.max(0, historyIndex - 4);
  const visible = history.slice(offset, historyIndex + 3);

  return (
    <div className="history-bar">
      <span className="history-label">HISTORY</span>
      <div className="history-pills">
        {visible.map((snap, i) => {
          const realIdx  = offset + i;
          const isCurrent = realIdx === historyIndex;
          const label    = snap ? snap.slice(0, 20) + (snap.length > 20 ? '…' : '') : '(empty)';
          return (
            <div key={realIdx} className={`history-pill${isCurrent ? ' current' : ''}`}>
              v{realIdx + 1}: {label}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ── Main Editor ─────────────────────────────────────────────────────────────
const NotesEditor = () => {
  const { notes, setNotes, undo, redo, history, historyIndex } = useNotes();
  const timerRef = useRef(null);

  const handleChange = (e) => {
    const val = e.target.value;
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setNotes(val), 400);
  };

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'z') { e.preventDefault(); undo(); }
    if ((e.ctrlKey || e.metaKey) && e.key === 'y') { e.preventDefault(); redo(); }
  };

  const insertText = (text) => setNotes(notes + '\n' + text);

  const lines = notes.split('\n').length;
  const words = notes.trim() ? notes.trim().split(/\s+/).length : 0;

  return (
    <div className="main">
      <div className="editor-area">

        {/* Toolbar */}
        <div className="editor-toolbar">
          <span className="toolbar-label">INSERT:</span>
          {['# Heading', '## Subheading', '**Bold**', '*Italic*', '> Quote', '- List item'].map(t => (
            <button key={t} className="format-btn" onClick={() => insertText(t)}>{t}</button>
          ))}
        </div>

        {/* Editor Box */}
        <div className="editor-wrapper">
          <div className="editor-header">
            <span className="editor-title">📝 LECTURE NOTES — CS401 Advanced Web Dev</span>
            <span className="char-count">{notes.length} chars</span>
          </div>
          <textarea
            key={historyIndex}
            defaultValue={notes}
            onInput={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={"Start typing your lecture notes here...\n\nTip: Use Ctrl+Z to undo, Ctrl+Y to redo\nOr use the Undo/Redo buttons above."}
          />
        </div>

        {/* Status Bar */}
        <div className="status-bar">
          <span>Lines: <strong style={{ color: 'var(--text)' }}>{lines}</strong></span>
          <span className="sep">|</span>
          <span>Words: <strong style={{ color: 'var(--text)' }}>{words}</strong></span>
          <span className="sep">|</span>
          <span>Chars: <strong style={{ color: 'var(--text)' }}>{notes.length}</strong></span>
          <span className="sep">|</span>
          <span>History: <strong style={{ color: 'var(--accent)' }}>{historyIndex + 1}/{history.length}</strong></span>
        </div>
      </div>

      <TypingIndicator />
      <HistoryBar />
    </div>
  );
};

export default NotesEditor;