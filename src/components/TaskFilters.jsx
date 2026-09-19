import React from 'react';
import { IconSearch, IconList, IconLayoutGrid, IconClock, IconPlus, IconX } from './Icons';

export const TaskFilters = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
  activeView,
  setActiveView,
  onOpenNewTaskModal
}) => {
  return (
    <div className="filters-container">
      {/* Top row: Search input & New Task CTA */}
      <div className="filters-top-row">
        <div className="search-input-wrapper">
          <IconSearch className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search tasks by title, category, or notes... (Press '/' to focus)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search tasks by title"
            data-testid="search-input"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="search-clear-btn"
              aria-label="Clear search"
              data-testid="search-clear-btn"
            >
              <IconX className="w-4 h-4" />
            </button>
          )}
        </div>

        <button
          onClick={onOpenNewTaskModal}
          className="btn btn-primary btn-add-task"
          aria-label="Create New Task"
          data-testid="new-task-btn"
        >
          <IconPlus className="w-5 h-5" />
          <span>New Task</span>
          <kbd className="kbd-shortcut">N</kbd>
        </button>
      </div>

      {/* Bottom row: Status tabs, Priority filter dropdown & View switcher */}
      <div className="filters-bottom-row">
        {/* Status Filter Tabs (All, Active, Completed) */}
        <div className="status-tabs" role="tablist" aria-label="Task Status Filters">
          {['All', 'Active', 'Completed'].map((tab) => (
            <button
              key={tab}
              role="tab"
              aria-selected={statusFilter === tab}
              onClick={() => setStatusFilter(tab)}
              className={`tab-btn ${statusFilter === tab ? 'active' : ''}`}
              data-testid={`status-filter-${tab.toLowerCase()}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="filter-controls-right">
          {/* Priority Filter Select */}
          <div className="priority-filter-wrapper">
            <label htmlFor="priority-select" className="filter-label">Priority:</label>
            <select
              id="priority-select"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="filter-select"
              aria-label="Filter tasks by priority"
              data-testid="priority-filter"
            >
              <option value="All">All Priorities</option>
              <option value="High">🔴 High Priority</option>
              <option value="Medium">🟡 Medium Priority</option>
              <option value="Low">🟢 Low Priority</option>
            </select>
          </div>

          {/* View Switcher buttons (List, Eisenhower Matrix, Focus Timer) */}
          <div className="view-switcher" role="radiogroup" aria-label="View Switcher">
            <button
              role="radio"
              aria-checked={activeView === 'list'}
              onClick={() => setActiveView('list')}
              className={`view-btn ${activeView === 'list' ? 'active' : ''}`}
              title="Standard Task List View"
              data-testid="view-btn-list"
            >
              <IconList className="w-4 h-4" />
              <span className="view-btn-label">List</span>
            </button>
            <button
              role="radio"
              aria-checked={activeView === 'matrix'}
              onClick={() => setActiveView('matrix')}
              className={`view-btn ${activeView === 'matrix' ? 'active' : ''}`}
              title="Eisenhower Matrix View (Urgent / Important)"
              data-testid="view-btn-matrix"
            >
              <IconLayoutGrid className="w-4 h-4" />
              <span className="view-btn-label">Matrix</span>
            </button>
            <button
              role="radio"
              aria-checked={activeView === 'timer'}
              onClick={() => setActiveView('timer')}
              className={`view-btn ${activeView === 'timer' ? 'active' : ''}`}
              title="Pomodoro Focus Timer View"
              data-testid="view-btn-timer"
            >
              <IconClock className="w-4 h-4" />
              <span className="view-btn-label">Timer</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
