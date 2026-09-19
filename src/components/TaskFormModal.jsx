import React, { useState, useEffect } from 'react';
import { IconX, IconPlus, IconTrash } from './Icons';

export const TaskFormModal = ({ isOpen, onClose, onSave, editingTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [category, setCategory] = useState('General');
  const [dueDate, setDueDate] = useState('');
  const [estimatedMinutes, setEstimatedMinutes] = useState('25');
  const [subtasks, setSubtasks] = useState([]);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || '');
      setDescription(editingTask.description || '');
      setPriority(editingTask.priority || 'Medium');
      setCategory(editingTask.category || 'General');
      setDueDate(editingTask.dueDate || '');
      setEstimatedMinutes(editingTask.estimatedMinutes?.toString() || '25');
      setSubtasks(editingTask.subtasks ? [...editingTask.subtasks] : []);
    } else {
      setTitle('');
      setDescription('');
      setPriority('Medium');
      setCategory('General');
      setDueDate('');
      setEstimatedMinutes('25');
      setSubtasks([]);
    }
    setNewSubtaskTitle('');
  }, [editingTask, isOpen]);

  // Handle escape key listener to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleAddSubtask = (e) => {
    e.preventDefault();
    if (!newSubtaskTitle.trim()) return;
    setSubtasks((prev) => [
      ...prev,
      { id: `sub-${Date.now()}`, title: newSubtaskTitle.trim(), completed: false }
    ]);
    setNewSubtaskTitle('');
  };

  const handleRemoveSubtask = (id) => {
    setSubtasks((prev) => prev.filter((s) => s.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({
      title: title.trim(),
      description: description.trim(),
      priority,
      category: category.trim() || 'General',
      dueDate,
      estimatedMinutes: parseInt(estimatedMinutes, 10) || 25,
      subtasks
    });

    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <h2 id="modal-title" className="modal-title">
            {editingTask ? 'Edit Task' : 'Create New Task'}
          </h2>
          <button onClick={onClose} className="modal-close-btn" aria-label="Close modal">
            <IconX className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="modal-form">
          {/* Title Input */}
          <div className="form-group">
            <label htmlFor="task-title-input" className="form-label">
              Task Title <span className="text-rose-400">*</span>
            </label>
            <input
              id="task-title-input"
              type="text"
              required
              autoFocus
              placeholder="e.g., Finalize project report"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-input"
            />
          </div>

          {/* Description */}
          <div className="form-group">
            <label htmlFor="task-desc-input" className="form-label">Description / Notes</label>
            <textarea
              id="task-desc-input"
              rows="3"
              placeholder="Add additional context or requirements..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-input form-textarea"
            />
          </div>

          {/* Grid layout for Priority, Category, Due Date, Est Time */}
          <div className="form-grid">
            {/* Priority Selector */}
            <div className="form-group">
              <label htmlFor="task-priority-select" className="form-label">Priority Level</label>
              <select
                id="task-priority-select"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="form-input"
              >
                <option value="High">🔴 High Priority</option>
                <option value="Medium">🟡 Medium Priority</option>
                <option value="Low">🟢 Low Priority</option>
              </select>
            </div>

            {/* Category */}
            <div className="form-group">
              <label htmlFor="task-cat-input" className="form-label">Category / Tag</label>
              <input
                id="task-cat-input"
                type="text"
                placeholder="e.g., Work, Personal, Dev"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="form-input"
              />
            </div>

            {/* Due Date */}
            <div className="form-group">
              <label htmlFor="task-date-input" className="form-label">Due Date</label>
              <input
                id="task-date-input"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="form-input"
              />
            </div>

            {/* Estimated Minutes */}
            <div className="form-group">
              <label htmlFor="task-est-input" className="form-label">Est. Focus (Minutes)</label>
              <input
                id="task-est-input"
                type="number"
                min="5"
                max="480"
                step="5"
                value={estimatedMinutes}
                onChange={(e) => setEstimatedMinutes(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          {/* Subtasks Checklist Builder */}
          <div className="form-group mt-2">
            <label className="form-label">Checklist / Subtasks</label>
            <div className="subtask-input-row">
              <input
                type="text"
                placeholder="Add subtask item..."
                value={newSubtaskTitle}
                onChange={(e) => setNewSubtaskTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSubtask(e);
                  }
                }}
                className="form-input text-sm"
              />
              <button
                type="button"
                onClick={handleAddSubtask}
                className="btn btn-secondary py-1.5 px-3"
              >
                <IconPlus className="w-4 h-4" />
              </button>
            </div>

            {subtasks.length > 0 && (
              <div className="subtasks-modal-list">
                {subtasks.map((st) => (
                  <div key={st.id} className="subtask-modal-item">
                    <span className="text-sm">{st.title}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSubtask(st.id)}
                      className="text-rose-400 hover:text-rose-300 p-1"
                      aria-label="Remove subtask"
                    >
                      <IconTrash className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="modal-footer">
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {editingTask ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
