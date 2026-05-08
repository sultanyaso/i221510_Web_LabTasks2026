import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';

export const NotesContext = createContext(null);

const STUDENTS = [
  { id: 1, name: 'Ayesha Khan',  color: '#7c6af7', bg: 'rgba(124,106,247,0.15)' },
  { id: 2, name: 'Bilal Raza',   color: '#f76a8a', bg: 'rgba(247,106,138,0.15)' },
  { id: 3, name: 'Sara Ahmed',   color: '#4ade80', bg: 'rgba(74,222,128,0.15)'  },
  { id: 4, name: 'Hamza Malik',  color: '#fbbf24', bg: 'rgba(251,191,36,0.15)'  },
  { id: 5, name: 'Zainab Ali',   color: '#38bdf8', bg: 'rgba(56,189,248,0.15)'  },
];

export const NotesProvider = ({ children }) => {
  const [history, setHistory]           = useState(['']);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [typingStudents, setTypingStudents] = useState([]);
  const [activeStudents]                = useState(STUDENTS);

  const notes = history[historyIndex];

  const setNotes = useCallback((newNotes) => {
    setHistory(prev => {
      const sliced = prev.slice(0, historyIndex + 1);
      return [...sliced, newNotes].slice(-20);
    });
    setHistoryIndex(prev => Math.min(prev + 1, 19));
  }, [historyIndex]);

  const undo = useCallback(() => {
    setHistoryIndex(prev => Math.max(prev - 1, 0));
  }, []);

  const redo = useCallback(() => {
    setHistoryIndex(prev => Math.min(prev + 1, history.length - 1));
  }, [history.length]);

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  // Simulate random students typing every 2.5s
  useEffect(() => {
    const interval = setInterval(() => {
      const count = Math.floor(Math.random() * 3);
      const shuffled = [...STUDENTS].sort(() => Math.random() - 0.5).slice(0, count);
      setTypingStudents(shuffled);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const value = useMemo(() => ({
    notes, setNotes, undo, redo, canUndo, canRedo,
    history, historyIndex, typingStudents, activeStudents,
  }), [notes, setNotes, undo, redo, canUndo, canRedo, history, historyIndex, typingStudents, activeStudents]);

  return (
    <NotesContext.Provider value={value}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
  const ctx = useContext(NotesContext);
  if (!ctx) throw new Error('useNotes must be used within NotesProvider');
  return ctx;
};