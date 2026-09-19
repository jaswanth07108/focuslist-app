import React, { useState } from 'react';
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
  onOpenNewTaskModal,
  onQuickAddTask
}) => {
  const [quickTitle, setQuickTitle] = useState('');
  const [quickPriority, setQuickPriority] = useState('Medium');

  const handleQuickSubmit = (e) => {
    e.preventDefault();
    if (!quickTitle.trim()) return;
    onQuickAddTask({
      title: quickTitle.trim(),
      priority: quickPriority
    });
    setQuickTitle('');
  };

  return (
    <div className="filters-container" role="region" aria-label="Task Controls and Search">
      {/* Quick Task Creation Form (Inline Input + Priority + Add Button) */}
      <form onSubmit={handleQuickSubmit} className="quick-add-form" data-testid="quick-add-form">
        <div className="quick-add-input-wrapper">
          <input
            type="text"
            className="quick-add-input"
            placeholder="Add a new task title and press Enter..."
            value={quickTitle}
            onChange={(e) => setQuickTitle(e.target.value)}
            aria-label="Add a new task title"
            data-testid="quick-add-input"
            id="task-title-quick-input"
          />
        </div>

        <select
          value={quickPriority}
          onChange={(e) => setQuickPriority(e.target.value)}
          className="quick-priority-select"
          aria-label="New task priority"
          data-testid="quick-priority-select"
        >
          <option value="High">🔴 High</option>
          <option value="Medium">🟡 Medium</option>
          <option value="Low">🟢 Low</option>
        </select>

        <button
          type="submit"
          className="btn btn-primary"
          aria-label="Add Task"
          data-testid="quick-add-btn"
        >
          <IconPlus className="w-4 h-4" />
          <span>Add</span>
        </button>

        <button
          type="button"
          onClick={onOpenNewTaskModal}
          className="btn btn-secondary"
          title="Open detailed task form modal"
          aria-label="Open detailed task modal"
          data-testid="new-task-btn"
        >
          <span className="btn-label-desktop">Detailed Form</span>
          <kbd className="kbd-shortcut">N</kbd>
        </button>
      </form>

      {/* Search Bar & View Switcher Row */}
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
            id="search-tasks-input"
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
      </div>

      {/* Status tabs, Priority filter dropdown & View switcher */}
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
            <label htmlFor="priority-select" className="filter-label">Priority Filter:</label>
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

          {/* View Switcher buttons */}
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
