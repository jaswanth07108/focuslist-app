import React, { useState, useEffect } from 'react';
import { useTasks } from './hooks/useTasks';
import { loadThemeFromStorage, saveThemeToStorage } from './utils/storage';
import { Navbar } from './components/Navbar';
import { TaskStats } from './components/TaskStats';
import { TaskFilters } from './components/TaskFilters';
import { TaskList } from './components/TaskList';
import { TaskFormModal } from './components/TaskFormModal';
import { FocusTimer } from './components/FocusTimer';
import { EisenhowerMatrix } from './components/EisenhowerMatrix';
import './App.css';

export function App() {
  const [theme, setTheme] = useState(() => loadThemeFromStorage());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const {
    tasks,
    filteredTasks,
    stats,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    activeView,
    setActiveView,
    selectedFocusTaskId,
    setSelectedFocusTaskId,
    addTask,
    updateTask,
    toggleTaskCompletion,
    deleteTask,
    clearCompletedTasks,
    toggleSubtask,
    resetToSampleTasks,
    importTasks
  } = useTasks();

  // Handle dark/light theme attribute sync
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    saveThemeToStorage(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Keyboard shortcut listener ('N' for new task, '/' for search)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore key shortcuts if user is currently typing in an input or textarea
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) {
        return;
      }

      if (e.key === 'n' || e.key === 'N') {
        e.preventDefault();
        setEditingTask(null);
        setIsModalOpen(true);
      } else if (e.key === '/') {
        e.preventDefault();
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
          searchInput.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Form Save Handler (Add or Edit)
  const handleSaveTask = (taskData) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData);
    } else {
      addTask(taskData);
    }
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleStartFocusTimer = (task) => {
    setSelectedFocusTaskId(task.id);
    setActiveView('timer');
  };

  const selectedFocusTask = tasks.find((t) => t.id === selectedFocusTaskId) || null;

  return (
    <div className="app-wrapper">
      {/* Navbar Header */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        tasks={tasks}
        onImport={importTasks}
        onReset={resetToSampleTasks}
      />

      {/* Main Container */}
      <main className="main-content" role="main">
        {/* Real-time Statistics Cards */}
        <TaskStats stats={stats} />

        {/* Filter, Search & View Controls */}
        <TaskFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
          activeView={activeView}
          setActiveView={setActiveView}
          onOpenNewTaskModal={() => {
            setEditingTask(null);
            setIsModalOpen(true);
          }}
        />

        {/* Dynamic Main View Switcher (List View vs Matrix View vs Focus Timer) */}
        {activeView === 'list' && (
          <TaskList
            tasks={filteredTasks}
            allTasksCount={tasks.length}
            onToggleComplete={toggleTaskCompletion}
            onEdit={handleEditClick}
            onDelete={deleteTask}
            onToggleSubtask={toggleSubtask}
            onStartFocusTimer={handleStartFocusTimer}
            onClearCompleted={clearCompletedTasks}
            onOpenNewTaskModal={() => {
              setEditingTask(null);
              setIsModalOpen(true);
            }}
          />
        )}

        {activeView === 'matrix' && (
          <EisenhowerMatrix
            tasks={filteredTasks}
            onToggleComplete={toggleTaskCompletion}
            onEdit={handleEditClick}
            onDelete={deleteTask}
            onToggleSubtask={toggleSubtask}
            onStartFocusTimer={handleStartFocusTimer}
          />
        )}

        {activeView === 'timer' && (
          <FocusTimer
            selectedTask={selectedFocusTask}
            tasks={tasks}
            onToggleComplete={toggleTaskCompletion}
            onSelectTask={(task) => setSelectedFocusTaskId(task ? task.id : null)}
          />
        )}
      </main>

      {/* Task Create / Edit Modal Dialog */}
      <TaskFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        onSave={handleSaveTask}
        editingTask={editingTask}
      />
    </div>
  );
}

export default App;
