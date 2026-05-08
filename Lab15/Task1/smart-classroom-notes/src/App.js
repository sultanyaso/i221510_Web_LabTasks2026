import React from 'react';
import { NotesProvider } from './context/NotesContext';
import NotesEditor from './components/NotesEditor';
import StudentsSidebar from './components/StudentsSidebar';
import UndoRedoPanel from './components/UndoRedoPanel';
import './App.css';

function TopBar() {
  return (
    <div className="topbar">
      <div className="topbar-left">
        <div className="logo">Class<span>Notes</span></div>
        <span className="badge">LIVE</span>
      </div>
      <UndoRedoPanel />
    </div>
  );
}

function App() {
  return (
    <NotesProvider>
      <div className="app">
        <TopBar />
        <div className="body">
          <StudentsSidebar />
          <NotesEditor />
        </div>
      </div>
    </NotesProvider>
  );
}

export default App;