import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('FocusList Main Application UI Integration Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders application branding and header elements', () => {
    render(<App />);
    expect(screen.getByText('FocusList')).toBeInTheDocument();
    expect(screen.getByText(/Build • Organize • Simplify/i)).toBeInTheDocument();
  });

  it('displays real-time statistics cards', () => {
    render(<App />);
    expect(screen.getByTestId('stat-card-total')).toBeInTheDocument();
    expect(screen.getByTestId('stat-card-pending')).toBeInTheDocument();
    expect(screen.getByTestId('stat-card-completed')).toBeInTheDocument();
  });

  it('opens create task modal when New Task button is clicked', () => {
    render(<App />);
    const newTaskBtn = screen.getByTestId('new-task-btn');
    fireEvent.click(newTaskBtn);

    expect(screen.getByTestId('task-modal')).toBeInTheDocument();
    expect(screen.getByTestId('task-title-input')).toBeInTheDocument();
  });

  it('creates a new task via modal form submission', () => {
    render(<App />);
    
    // Open modal
    fireEvent.click(screen.getByTestId('new-task-btn'));

    // Fill form
    const titleInput = screen.getByTestId('task-title-input');
    fireEvent.change(titleInput, { target: { value: 'Automated Test Task Title' } });

    const submitBtn = screen.getByTestId('submit-task-btn');
    fireEvent.click(submitBtn);

    // Verify task is added to DOM
    expect(screen.getByText('Automated Test Task Title')).toBeInTheDocument();
  });

  it('filters task list when search query is entered', () => {
    render(<App />);
    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'NonExistentTaskQueryXYZ999' } });

    expect(screen.getByText(/No Matching Tasks Found/i)).toBeInTheDocument();
  });

  it('switches view modes correctly between List, Matrix, and Timer', () => {
    render(<App />);
    
    const matrixViewBtn = screen.getByTestId('view-btn-matrix');
    fireEvent.click(matrixViewBtn);
    expect(screen.getByText(/Q1: Do First/i)).toBeInTheDocument();

    const timerViewBtn = screen.getByTestId('view-btn-timer');
    fireEvent.click(timerViewBtn);
    expect(screen.getByText(/Ready to Focus/i)).toBeInTheDocument();
  });
});
