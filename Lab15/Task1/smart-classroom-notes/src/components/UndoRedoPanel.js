import React from 'react';
import { useNotes } from '../context/NotesContext';

const UndoRedoPanel = () => {
  const { undo, redo, canUndo, canRedo, historyIndex, setNotes } = useNotes();

  return (
    <div className="topbar-right">
      <button className="btn btn-ghost" onClick={undo} disabled={!canUndo}>
        ↩ Undo {canUndo && <span className="undo-count">{historyIndex}</span>}
      </button>
      <button className="btn btn-ghost" onClick={redo} disabled={!canRedo}>
        Redo ↪
      </button>
      <button className="btn btn-danger" onClick={() => setNotes('')}>
        🗑 Clear
      </button>
      <button className="btn btn-accent">
        💾 Save Notes
      </button>
    </div>
  );
};

export default UndoRedoPanel;