import React from 'react';
import { TaskItem } from './TaskItem';
import { IconSparkles, IconTrash, IconCheck } from './Icons';

export const TaskList = ({
  tasks,
  allTasksCount,
  onToggleComplete,
  onEdit,
  onDelete,
  onToggleSubtask,
  onStartFocusTimer,
  onClearCompleted,
  onOpenNewTaskModal
}) => {
  const completedCount = tasks.filter((t) => t.completed).length;

  if (tasks.length === 0) {
    return (
      <div className="empty-state-card" role="region" aria-label="No tasks found">
        <div className="empty-state-icon">
          <IconSparkles className="w-12 h-12 text-indigo-400" />
        </div>
        <h3 className="empty-state-title">
          {allTasksCount === 0 ? "Your FocusList is Clear!" : "No Matching Tasks Found"}
        </h3>
        <p className="empty-state-description">
          {allTasksCount === 0
            ? "Get started by adding your first daily goal or task above."
            : "Try adjusting your search keywords, status filter, or priority selection."}
        </p>
        <button onClick={onOpenNewTaskModal} className="btn btn-primary mt-4">
          + Create First Task
        </button>
      </div>
    );
  }

  return (
    <section className="task-list-section" aria-label="Task List">
      {/* Header bar with count and Bulk Clear button */}
      <div className="task-list-header">
        <span className="task-count-label">
          Showing {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
        </span>

        {completedCount > 0 && (
          <button
            onClick={onClearCompleted}
            className="btn btn-secondary text-xs py-1 px-3.5 border-rose-500/30 text-rose-400 hover:bg-rose-500/10"
            aria-label="Clear all completed tasks"
          >
            <IconTrash className="w-3.5 h-3.5 inline mr-1" />
            Clear Completed ({completedCount})
          </button>
        )}
      </div>

      {/* Task Cards Grid */}
      <div className="task-cards-container">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleComplete={onToggleComplete}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggleSubtask={onToggleSubtask}
            onStartFocusTimer={onStartFocusTimer}
          />
        ))}
      </div>
    </section>
  );
};
