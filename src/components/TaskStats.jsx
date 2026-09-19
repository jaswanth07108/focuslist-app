import React from 'react';
import { IconClock } from './Icons';

export const TaskStats = ({ stats }) => {
  const { total, completed, pending, completionRate, highPriorityCount } = stats;

  return (
    <section className="stats-section" aria-label="Task Statistics Summary" aria-live="polite">
      {/* Total Tasks Card */}
      <div className="stat-card stat-total" data-testid="stat-card-total">
        <div className="stat-header">
          <span className="stat-label">Total Tasks</span>
          <span className="stat-pill badge-neutral" data-testid="stat-total">{total}</span>
        </div>
        <div className="stat-value" data-testid="stat-total-val">{total}</div>
        <div className="stat-footer">
          <span>All tracked items</span>
        </div>
      </div>

      {/* Pending / Active Tasks Card */}
      <div className="stat-card stat-pending" data-testid="stat-card-pending">
        <div className="stat-header">
          <span className="stat-label">Pending Tasks</span>
          <span className="stat-pill badge-warning" data-testid="stat-pending">{pending}</span>
        </div>
        <div className="stat-value" data-testid="stat-pending-val">{pending}</div>
        <div className="stat-footer text-amber-400">
          {highPriorityCount > 0 ? `${highPriorityCount} Urgent / High priority` : 'Keep up the momentum!'}
        </div>
      </div>

      {/* Completed Tasks Card */}
      <div className="stat-card stat-completed" data-testid="stat-card-completed">
        <div className="stat-header">
          <span className="stat-label">Completed</span>
          <span className="stat-pill badge-success" data-testid="stat-completed">{completed}</span>
        </div>
        <div className="stat-value" data-testid="stat-completed-val">{completed}</div>
        <div className="stat-footer text-emerald-400">
          {total > 0 ? `${completionRate}% Completion Rate` : 'No tasks created yet'}
        </div>
      </div>

      {/* Progress Bar & Rate Card */}
      <div className="stat-card stat-rate" data-testid="stat-card-rate">
        <div className="stat-header">
          <span className="stat-label">Productivity Velocity</span>
          <span className="stat-value-sm" data-testid="stat-rate-val">{completionRate}%</span>
        </div>
        <div className="progress-bar-track" role="progressbar" aria-valuenow={completionRate} aria-valuemin="0" aria-valuemax="100">
          <div
            className="progress-bar-fill"
            style={{ width: `${completionRate}%` }}
          />
        </div>
        <div className="stat-footer">
          <IconClock className="w-3.5 h-3.5 inline mr-1 text-indigo-400" />
          <span>Real-time persistence active</span>
        </div>
      </div>
    </section>
  );
};
