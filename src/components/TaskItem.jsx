import React, { useState } from 'react';
import { IconCheck, IconTrash, IconEdit, IconClock, IconTag, IconCalendar } from './Icons';

export const TaskItem = ({
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
    >
      <div className="task-card-main">
        {/* Completion Checkbox */}
        <button
          onClick={() => onToggleComplete(task.id)}
          className={`checkbox-custom ${task.completed ? 'checkbox-checked' : ''}`}
          aria-label={task.completed ? "Mark task as pending" : "Mark task as completed"}
          title={task.completed ? "Mark task as pending" : "Mark task as completed"}
        >
          {task.completed && <IconCheck className="w-4 h-4 text-white" />}
        </button>

        {/* Task Title & Details */}
        <div className="task-content">
          <div className="task-header-line">
            <h3 className={`task-title ${task.completed ? 'completed-text' : ''}`}>
              {task.title}
            </h3>

            {/* Priority Badge */}
            <span className={getPriorityBadgeClass(task.priority)}>
              {task.priority === 'High' && '🔴 High'}
              {task.priority === 'Medium' && '🟡 Medium'}
              {task.priority === 'Low' && '🟢 Low'}
            </span>
          </div>

          {/* Description */}
          {task.description && (
            <p className={`task-description ${task.completed ? 'completed-text' : ''}`}>
              {task.description}
            </p>
          )}

          {/* Metadata badges (Category, Due Date, Focus Time) */}
          <div className="task-meta-row">
            {task.category && (
              <span className="meta-tag">
                <IconTag className="w-3.5 h-3.5" />
                {task.category}
              </span>
            )}

            {task.dueDate && (
              <span className="meta-tag">
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
              >
                Checklist ({completedSubtasksCount}/{totalSubtasksCount})
              </button>
            )}
          </div>

          {/* Subtasks Accordion / Checklist */}
          {totalSubtasksCount > 0 && showSubtasks && (
            <div className="subtasks-container">
              {task.subtasks.map((subtask) => (
                <label key={subtask.id} className="subtask-item cursor-pointer">
                  <input
                    type="checkbox"
                    checked={subtask.completed}
                    onChange={() => onToggleSubtask(task.id, subtask.id)}
                    className="subtask-checkbox"
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
          >
            <IconEdit className="w-4 h-4" />
          </button>

          {/* Delete Task */}
          <button
            onClick={() => onDelete(task.id)}
            className="btn-action btn-action-delete"
            title="Delete Task"
            aria-label="Delete Task"
          >
            <IconTrash className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
};
