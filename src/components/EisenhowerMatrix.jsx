import React from 'react';
import { TaskItem } from './TaskItem';
import { IconFlame, IconClock, IconTag, IconCheck } from './Icons';

export const EisenhowerMatrix = ({
  tasks,
  onToggleComplete,
  onEdit,
  onDelete,
  onToggleSubtask,
  onStartFocusTimer
}) => {
  // Categorize tasks into 4 Quadrants
  const q1HighUrgent = tasks.filter((t) => t.priority === 'High' && !t.completed);
  const q2MediumSchedule = tasks.filter((t) => t.priority === 'Medium' && !t.completed);
  const q3LowDelegate = tasks.filter((t) => t.priority === 'Low' && !t.completed);
  const q4Completed = tasks.filter((t) => t.completed);

  return (
    <section className="eisenhower-grid" aria-label="Eisenhower Matrix Quadrants">
      {/* Quadrant 1: High Priority (Do First) */}
      <div className="matrix-quadrant quadrant-q1">
        <div className="quadrant-header">
          <IconFlame className="w-5 h-5 text-rose-400" />
          <h3 className="quadrant-title">Q1: Do First (High Priority)</h3>
          <span className="quadrant-badge badge-rose">{q1HighUrgent.length}</span>
        </div>
        <p className="quadrant-subtitle">Urgent & Critical Tasks</p>
        <div className="quadrant-content">
          {q1HighUrgent.length === 0 ? (
            <p className="quadrant-empty">No high priority tasks right now!</p>
          ) : (
            q1HighUrgent.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggleComplete={onToggleComplete}
                onEdit={onEdit}
                onDelete={onDelete}
                onToggleSubtask={onToggleSubtask}
                onStartFocusTimer={onStartFocusTimer}
              />
            ))
          )}
        </div>
      </div>

      {/* Quadrant 2: Medium Priority (Schedule) */}
      <div className="matrix-quadrant quadrant-q2">
        <div className="quadrant-header">
          <IconClock className="w-5 h-5 text-amber-400" />
          <h3 className="quadrant-title">Q2: Schedule (Medium Priority)</h3>
          <span className="quadrant-badge badge-amber">{q2MediumSchedule.length}</span>
        </div>
        <p className="quadrant-subtitle">Important, Not Urgent</p>
        <div className="quadrant-content">
          {q2MediumSchedule.length === 0 ? (
            <p className="quadrant-empty">No medium priority tasks scheduled.</p>
          ) : (
            q2MediumSchedule.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggleComplete={onToggleComplete}
                onEdit={onEdit}
                onDelete={onDelete}
                onToggleSubtask={onToggleSubtask}
                onStartFocusTimer={onStartFocusTimer}
              />
            ))
          )}
        </div>
      </div>

      {/* Quadrant 3: Low Priority (Quick Wins) */}
      <div className="matrix-quadrant quadrant-q3">
        <div className="quadrant-header">
          <IconTag className="w-5 h-5 text-emerald-400" />
          <h3 className="quadrant-title">Q3: Quick Wins (Low Priority)</h3>
          <span className="quadrant-badge badge-emerald">{q3LowDelegate.length}</span>
        </div>
        <p className="quadrant-subtitle">Low Effort / Routine Tasks</p>
        <div className="quadrant-content">
          {q3LowDelegate.length === 0 ? (
            <p className="quadrant-empty">No low priority tasks.</p>
          ) : (
            q3LowDelegate.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggleComplete={onToggleComplete}
                onEdit={onEdit}
                onDelete={onDelete}
                onToggleSubtask={onToggleSubtask}
                onStartFocusTimer={onStartFocusTimer}
              />
            ))
          )}
        </div>
      </div>

      {/* Quadrant 4: Completed Tasks Archive */}
      <div className="matrix-quadrant quadrant-q4">
        <div className="quadrant-header">
          <IconCheck className="w-5 h-5 text-indigo-400" />
          <h3 className="quadrant-title">Q4: Done & Archived</h3>
          <span className="quadrant-badge badge-indigo">{q4Completed.length}</span>
        </div>
        <p className="quadrant-subtitle">Completed Achievements</p>
        <div className="quadrant-content">
          {q4Completed.length === 0 ? (
            <p className="quadrant-empty">No completed tasks yet.</p>
          ) : (
            q4Completed.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggleComplete={onToggleComplete}
                onEdit={onEdit}
                onDelete={onDelete}
                onToggleSubtask={onToggleSubtask}
                onStartFocusTimer={onStartFocusTimer}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};
