import React, { useState } from 'react';
import { IconCheck, IconTrash, IconEdit, IconClock, IconTag, IconCalendar } from './Icons';

export const TaskItem = React.memo(({
  task,
  onToggleComplete,
  onEdit,
  onDelete,
  onToggleSubtask,
  onStartFocusTimer
}) => {
  const [showSubtasks, setShowSubtasks] = useState(false);

  // Priority color styling helper
  const getPriorityBadgeClass = (priority) => {
    switch (priority) {
      case 'High':
        return 'priority-badge priority-high';
      case 'Medium':
        return 'priority-badge priority-medium';
      case 'Low':
        return 'priority-badge priority-low';
      default:
        return 'priority-badge priority-low';
    }
  };

  const completedSubtasksCount = task.subtasks
    ? task.subtasks.filter((s) => s.completed).length
    : 0;
  const totalSubtasksCount = task.subtasks ? task.subtasks.length : 0;

  return (
    <article
      className={`task-card ${task.completed ? 'task-card-completed' : ''}`}
      aria-label={`Task: ${task.title}`}
      data-testid="task-item"
      data-task-id={task.id}
      data-priority={task.priority}
      data-completed={task.completed}
    >
      <div className="task-card-main">
        {/* Completion Checkbox */}
        <button
          onClick={() => onToggleComplete(task.id)}
          className={`checkbox-custom ${task.completed ? 'checkbox-checked' : ''}`}
          aria-label={task.completed ? "Mark task as pending" : "Mark task as completed"}
          aria-checked={task.completed}
          role="checkbox"
          title={task.completed ? "Mark task as pending" : "Mark task as completed"}
          data-testid="task-checkbox"
        >
          {task.completed && <IconCheck className="w-4 h-4 text-white" />}
        </button>

        {/* Task Title & Details */}
        <div className="task-content">
          <div className="task-header-line">
            <h3 className={`task-title ${task.completed ? 'completed-text' : ''}`} data-testid="task-title">
              {task.title}
            </h3>

            {/* Priority Badge */}
            <span className={getPriorityBadgeClass(task.priority)} data-testid="task-priority">
              {task.priority === 'High' && '🔴 High'}
              {task.priority === 'Medium' && '🟡 Medium'}
              {task.priority === 'Low' && '🟢 Low'}
            </span>
          </div>

          {/* Description */}
          {task.description && (
            <p className={`task-description ${task.completed ? 'completed-text' : ''}`} data-testid="task-description">
              {task.description}
            </p>
          )}

          {/* Metadata badges (Category, Due Date, Focus Time) */}
          <div className="task-meta-row">
            {task.category && (
              <span className="meta-tag" data-testid="task-category">
                <IconTag className="w-3.5 h-3.5" />
                {task.category}
              </span>
            )}

            {task.dueDate && (
              <span className="meta-tag" data-testid="task-duedate">
                <IconCalendar className="w-3.5 h-3.5" />
                Due: {task.dueDate}
              </span>
            )}

            {task.estimatedMinutes > 0 && (
              <span className="meta-tag">
                <IconClock className="w-3.5 h-3.5" />
                {task.estimatedMinutes}m est.
              </span>
            )}

            {totalSubtasksCount > 0 && (
              <button
                onClick={() => setShowSubtasks(!showSubtasks)}
                className="meta-tag meta-tag-button"
                aria-label="Toggle subtasks view"
                aria-expanded={showSubtasks}
                data-testid="subtasks-toggle"
              >
                Checklist ({completedSubtasksCount}/{totalSubtasksCount})
              </button>
            )}
          </div>

          {/* Subtasks Accordion / Checklist */}
          {totalSubtasksCount > 0 && showSubtasks && (
            <div className="subtasks-container" data-testid="subtasks-container">
              {task.subtasks.map((subtask) => (
                <label key={subtask.id} className="subtask-item cursor-pointer">
                  <input
                    type="checkbox"
                    checked={subtask.completed}
                    onChange={() => onToggleSubtask(task.id, subtask.id)}
                    className="subtask-checkbox"
                    data-testid={`subtask-checkbox-${subtask.id}`}
                  />
                  <span className={subtask.completed ? 'completed-text' : ''}>
                    {subtask.title}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="task-actions">
          {/* Start Focus Timer */}
          {!task.completed && (
            <button
              onClick={() => onStartFocusTimer(task)}
              className="btn-action btn-action-focus"
              title="Start Pomodoro Focus Timer for this task"
              aria-label="Focus on task"
              data-testid="start-timer-btn"
            >
              <IconClock className="w-4 h-4 text-indigo-400" />
            </button>
          )}

          {/* Edit Task */}
          <button
            onClick={() => onEdit(task)}
            className="btn-action btn-action-edit"
            title="Edit Task"
            aria-label="Edit Task"
            data-testid="task-edit-btn"
          >
            <IconEdit className="w-4 h-4" />
          </button>

          {/* Delete Task */}
          <button
            onClick={() => onDelete(task.id)}
            className="btn-action btn-action-delete"
            title="Delete Task"
            aria-label="Delete Task"
            data-testid="task-delete-btn"
          >
            <IconTrash className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
});
