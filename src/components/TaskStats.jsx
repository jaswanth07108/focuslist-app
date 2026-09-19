import React from 'react';
import { IconClock } from './Icons';

export const TaskStats = ({ stats }) => {
  const { total, completed, pending, completionRate, highPriorityCount } = stats;

  return (
    <section className="stats-section" aria-label="Task Statistics Summary">
      {/* Total Tasks Card */}
      <div className="stat-card stat-total">
        <div className="stat-header">
          <span className="stat-label">Total Tasks</span>
          <span className="stat-pill badge-neutral">{total}</span>
        </div>
        <div className="stat-value">{total}</div>
        <div className="stat-footer">
          <span>All tracked items</span>
        </div>
      </div>

      {/* Pending / Active Tasks Card */}
      <div className="stat-card stat-pending">
        <div className="stat-header">
          <span className="stat-label">Pending Tasks</span>
          <span className="stat-pill badge-warning">{pending}</span>
        </div>
        <div className="stat-value">{pending}</div>
        <div className="stat-footer text-amber-400">
          {highPriorityCount > 0 ? `${highPriorityCount} Urgent / High priority` : 'Keep up the momentum!'}
        </div>
      </div>

      {/* Completed Tasks Card */}
      <div className="stat-card stat-completed">
        <div className="stat-header">
          <span className="stat-label">Completed</span>
          <span className="stat-pill badge-success">{completed}</span>
        </div>
        <div className="stat-value">{completed}</div>
        <div className="stat-footer text-emerald-400">
          {total > 0 ? `${completionRate}% Completion Rate` : 'No tasks created yet'}
        </div>
      </div>

      {/* Progress Bar & Rate Card */}
      <div className="stat-card stat-rate">
        <div className="stat-header">
          <span className="stat-label">Productivity Velocity</span>
          <span className="stat-value-sm">{completionRate}%</span>
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
