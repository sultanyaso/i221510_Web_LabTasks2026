import React from 'react';
import { useNotes } from '../context/NotesContext';

const StudentsSidebar = () => {
  const { activeStudents, typingStudents } = useNotes();
  const typingIds = typingStudents.map(s => s.id);

  return (
    <div className="sidebar">
      <div className="sidebar-header">Active Students</div>

      <div className="student-list">
        {activeStudents.map((s, i) => {
          const isTyping = typingIds.includes(s.id);
          const isAway   = i === 3;
          const initials = s.name.split(' ').map(n => n[0]).join('');
          return (
            <div className="student-item" key={s.id}>
              <div className="avatar" style={{ background: s.bg, color: s.color }}>
                {initials}
              </div>
              <div className="student-info">
                <div className="student-name">{s.name}</div>
                <div className={`student-status${isTyping ? ' typing' : ''}`}>
                  {isTyping ? '✏️ typing...' : isAway ? 'Away' : 'Viewing notes'}
                </div>
              </div>
              <div className={`dot${isAway ? ' away' : ''}`} />
            </div>
          );
        })}
      </div>

      <div className="sidebar-footer">
        <div className="online-count">
          <strong>{activeStudents.length}</strong> students online
        </div>
      </div>
    </div>
  );
};

export default StudentsSidebar;