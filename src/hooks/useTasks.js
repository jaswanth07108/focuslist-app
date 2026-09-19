import { useState, useEffect, useMemo, useCallback } from 'react';
import { loadTasksFromStorage, saveTasksToStorage, SAMPLE_TASKS } from '../utils/storage';
import { sanitizeString, validateTaskSchema } from '../utils/security';
import { playTaskCompleteSound } from '../utils/audio';

export const useTasks = () => {
  const [tasks, setTasks] = useState(() => loadTasksFromStorage());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All'); // 'All' | 'Active' | 'Completed'
  const [priorityFilter, setPriorityFilter] = useState('All'); // 'All' | 'High' | 'Medium' | 'Low'
  const [activeView, setActiveView] = useState('list'); // 'list' | 'matrix' | 'timer'
  const [selectedFocusTaskId, setSelectedFocusTaskId] = useState(null);

  // Sync to LocalStorage on every tasks state change
  useEffect(() => {
    saveTasksToStorage(tasks);
  }, [tasks]);

  // Create Task
  const addTask = useCallback((taskData) => {
    const rawTask = {
      id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      title: sanitizeString(taskData.title),
      description: sanitizeString(taskData.description || ''),
      priority: ['High', 'Medium', 'Low'].includes(taskData.priority) ? taskData.priority : 'Medium',
      completed: false,
      createdAt: new Date().toISOString(),
      dueDate: taskData.dueDate || '',
      category: sanitizeString(taskData.category || 'General'),
      estimatedMinutes: parseInt(taskData.estimatedMinutes, 10) || 25,
      completedMinutes: 0,
      subtasks: Array.isArray(taskData.subtasks)
        ? taskData.subtasks.map((st) => ({
            id: st.id || `sub-${Math.random().toString(36).substr(2, 5)}`,
            title: sanitizeString(st.title),
            completed: Boolean(st.completed)
          }))
        : []
    };

    const validated = validateTaskSchema(rawTask);
    if (!validated || !validated.title) return null;

    setTasks((prev) => [validated, ...prev]);
    return validated;
  }, []);

  // Update Task
  const updateTask = useCallback((id, updatedFields) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === id) {
          const merged = { ...task, ...updatedFields };
          if (updatedFields.title) merged.title = sanitizeString(updatedFields.title);
          if (updatedFields.description) merged.description = sanitizeString(updatedFields.description);
          if (updatedFields.category) merged.category = sanitizeString(updatedFields.category);
          return validateTaskSchema(merged) || task;
        }
        return task;
      })
    );
  }, []);

  // Toggle Task Completion
  const toggleTaskCompletion = useCallback((id) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === id) {
          const isNowCompleted = !task.completed;
          if (isNowCompleted) {
            playTaskCompleteSound();
          }
          return { ...task, completed: isNowCompleted };
        }
        return task;
      })
    );
  }, []);

  // Delete Task
  const deleteTask = useCallback((id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    if (selectedFocusTaskId === id) {
      setSelectedFocusTaskId(null);
    }
  }, [selectedFocusTaskId]);

  // Clear All Completed Tasks
  const clearCompletedTasks = useCallback(() => {
    setTasks((prev) => prev.filter((task) => !task.completed));
  }, []);

  // Toggle Subtask Completion
  const toggleSubtask = useCallback((taskId, subtaskId) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === taskId && task.subtasks) {
          const updatedSubtasks = task.subtasks.map((sub) =>
            sub.id === subtaskId ? { ...sub, completed: !sub.completed } : sub
          );
          return { ...task, subtasks: updatedSubtasks };
        }
        return task;
      })
    );
  }, []);

  // Reset to Initial Sample Tasks
  const resetToSampleTasks = useCallback(() => {
    setTasks(SAMPLE_TASKS);
    saveTasksToStorage(SAMPLE_TASKS);
  }, []);

  // Bulk Import Tasks
  const importTasks = useCallback((importedTasks) => {
    if (Array.isArray(importedTasks)) {
      const validTasks = importedTasks.map(validateTaskSchema).filter(Boolean);
      setTasks(validTasks);
    }
  }, []);

  // Filtered & Searched Tasks computation
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      // 1. Title & Description Search
      const matchesSearch =
        !searchQuery.trim() ||
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.category.toLowerCase().includes(searchQuery.toLowerCase());

      // 2. Status Filter
      const matchesStatus =
        statusFilter === 'All' ||
        (statusFilter === 'Active' && !task.completed) ||
        (statusFilter === 'Completed' && task.completed);

      // 3. Priority Filter
      const matchesPriority =
        priorityFilter === 'All' || task.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, searchQuery, statusFilter, priorityFilter]);

  // Statistics calculation
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const pending = total - completed;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
    const highPriorityCount = tasks.filter((t) => t.priority === 'High' && !t.completed).length;
    const totalEstimatedMinutes = tasks.reduce((sum, t) => sum + (t.estimatedMinutes || 0), 0);

    return {
      total,
      completed,
      pending,
      completionRate,
      highPriorityCount,
      totalEstimatedMinutes
    };
  }, [tasks]);

  return {
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
  };
};
