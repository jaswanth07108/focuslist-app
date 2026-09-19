import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTasks } from '../hooks/useTasks';
import { loadTasksFromStorage } from '../utils/storage';

describe('useTasks Hook Unit & Integration Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize with default sample tasks when storage is empty', () => {
    const { result } = renderHook(() => useTasks());
    expect(result.current.tasks.length).toBeGreaterThan(0);
    expect(result.current.stats.total).toBe(result.current.tasks.length);
  });

  it('should create a new task successfully with valid data', () => {
    const { result } = renderHook(() => useTasks());
    const initialCount = result.current.tasks.length;

    act(() => {
      result.current.addTask({
        title: 'New Unit Test Task',
        description: 'Testing task creation logic',
        priority: 'High',
        category: 'Testing',
        dueDate: '2026-10-01',
        estimatedMinutes: 30
      });
    });

    expect(result.current.tasks.length).toBe(initialCount + 1);
    expect(result.current.tasks[0].title).toBe('New Unit Test Task');
    expect(result.current.tasks[0].priority).toBe('High');
    expect(result.current.tasks[0].completed).toBe(false);
  });

  it('should toggle task completion state', () => {
    const { result } = renderHook(() => useTasks());
    const targetTask = result.current.tasks[0];
    const initialCompleted = targetTask.completed;

    act(() => {
      result.current.toggleTaskCompletion(targetTask.id);
    });

    const updatedTask = result.current.tasks.find((t) => t.id === targetTask.id);
    expect(updatedTask.completed).toBe(!initialCompleted);
  });

  it('should delete a task correctly', () => {
    const { result } = renderHook(() => useTasks());
    const targetTask = result.current.tasks[0];
    const initialCount = result.current.tasks.length;

    act(() => {
      result.current.deleteTask(targetTask.id);
    });

    expect(result.current.tasks.length).toBe(initialCount - 1);
    expect(result.current.tasks.find((t) => t.id === targetTask.id)).toBeUndefined();
  });

  it('should filter tasks by title search query', () => {
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.addTask({
        title: 'Unique Searchable Keyword Task XYZ',
        priority: 'Medium'
      });
    });

    act(() => {
      result.current.setSearchQuery('Keyword Task XYZ');
    });

    expect(result.current.filteredTasks.length).toBe(1);
    expect(result.current.filteredTasks[0].title).toContain('Unique Searchable Keyword Task XYZ');
  });

  it('should filter tasks by priority level', () => {
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.setPriorityFilter('High');
    });

    expect(result.current.filteredTasks.every((t) => t.priority === 'High')).toBe(true);
  });

  it('should filter tasks by status (Active / Completed)', () => {
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.setStatusFilter('Active');
    });

    expect(result.current.filteredTasks.every((t) => !t.completed)).toBe(true);

    act(() => {
      result.current.setStatusFilter('Completed');
    });

    expect(result.current.filteredTasks.every((t) => t.completed)).toBe(true);
  });

  it('should compute stats correctly', () => {
    const { result } = renderHook(() => useTasks());
    const { stats, tasks } = result.current;

    const expectedTotal = tasks.length;
    const expectedCompleted = tasks.filter((t) => t.completed).length;
    const expectedPending = expectedTotal - expectedCompleted;

    expect(stats.total).toBe(expectedTotal);
    expect(stats.completed).toBe(expectedCompleted);
    expect(stats.pending).toBe(expectedPending);
  });
});
