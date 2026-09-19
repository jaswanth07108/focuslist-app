// Security & Data Sanitization utilities

/**
 * Escapes potentially dangerous HTML character entities to prevent XSS attacks
 */
export const sanitizeString = (str) => {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

/**
 * Validates and cleans task objects from LocalStorage or JSON imports
 */
export const validateTaskSchema = (task) => {
  if (!task || typeof task !== 'object') return null;
  
  return {
    id: String(task.id || `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`),
    title: String(task.title || '').trim(),
    description: String(task.description || '').trim(),
    priority: ['High', 'Medium', 'Low'].includes(task.priority) ? task.priority : 'Medium',
    completed: Boolean(task.completed),
    createdAt: task.createdAt ? String(task.createdAt) : new Date().toISOString(),
    dueDate: task.dueDate ? String(task.dueDate) : '',
    category: task.category ? String(task.category).trim() : 'General',
    estimatedMinutes: Math.max(1, parseInt(task.estimatedMinutes, 10) || 25),
    completedMinutes: Math.max(0, parseInt(task.completedMinutes, 10) || 0),
    subtasks: Array.isArray(task.subtasks)
      ? task.subtasks.map((st) => ({
          id: String(st.id || `sub-${Math.random().toString(36).substr(2, 9)}`),
          title: String(st.title || '').trim(),
          completed: Boolean(st.completed)
        }))
      : []
  };
};
