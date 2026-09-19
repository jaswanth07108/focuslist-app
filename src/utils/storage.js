import { validateTaskSchema } from './security';

const PRIMARY_KEY = 'focuslist_tasks_v1';
const FALLBACK_KEYS = ['tasks', 'focuslist_tasks'];
const THEME_KEY = 'focuslist_theme_v1';

export const SAMPLE_TASKS = [
  {
    id: 'task-1',
    title: 'Design FocusList UI Wireframe',
    description: 'Create high-fidelity dark mode wireframes with responsive layout and glassmorphism styling.',
    priority: 'High',
    completed: true,
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    category: 'Design',
    estimatedMinutes: 45,
    completedMinutes: 45,
    subtasks: [
      { id: 'sub-1', title: 'Define color tokens & dark theme', completed: true },
      { id: 'sub-2', title: 'Draft accessibility layout grid', completed: true }
    ]
  },
  {
    id: 'task-2',
    title: 'Implement Task Priority & Filtering System',
    description: 'Build multi-criteria search by title, priority (High/Medium/Low), and completion status.',
    priority: 'High',
    completed: false,
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
    dueDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    category: 'Development',
    estimatedMinutes: 30,
    completedMinutes: 15,
    subtasks: [
      { id: 'sub-3', title: 'Status tabs (All, Active, Completed)', completed: true },
      { id: 'sub-4', title: 'Priority selector dropdown', completed: false }
    ]
  },
  {
    id: 'task-3',
    title: 'Integrate Pomodoro Focus Timer',
    description: 'Add built-in 25-minute focus session timer linked to selected tasks with audio alert.',
    priority: 'Medium',
    completed: false,
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    dueDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
    category: 'Feature',
    estimatedMinutes: 25,
    completedMinutes: 0,
    subtasks: [
      { id: 'sub-5', title: 'Timer countdown & progress circle', completed: true },
      { id: 'sub-6', title: 'Web Audio chime notification', completed: false }
    ]
  },
  {
    id: 'task-4',
    title: 'Review Accessibility & WCAG Compliance',
    description: 'Ensure focus rings, high-contrast badges, keyboard shortcuts, and ARIA labels are active.',
    priority: 'Low',
    completed: false,
    createdAt: new Date(Date.now() - 3600000 * 1).toISOString(),
    dueDate: new Date(Date.now() + 86400000 * 4).toISOString().split('T')[0],
    category: 'QA',
    estimatedMinutes: 20,
    completedMinutes: 0,
    subtasks: []
  }
];

export const loadTasksFromStorage = () => {
  try {
    const keysToTry = [PRIMARY_KEY, ...FALLBACK_KEYS];
    for (const key of keysToTry) {
      const raw = localStorage.getItem(key);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const validated = parsed.map(validateTaskSchema).filter(Boolean);
          if (validated.length > 0) return validated;
        }
      }
    }
    saveTasksToStorage(SAMPLE_TASKS);
    return SAMPLE_TASKS;
  } catch (e) {
    console.error('Failed to load tasks from localStorage:', e);
    return SAMPLE_TASKS;
  }
};

export const saveTasksToStorage = (tasks) => {
  try {
    const validated = Array.isArray(tasks) ? tasks.map(validateTaskSchema).filter(Boolean) : [];
    const jsonStr = JSON.stringify(validated);
    localStorage.setItem(PRIMARY_KEY, jsonStr);
    FALLBACK_KEYS.forEach(key => localStorage.setItem(key, jsonStr));
  } catch (e) {
    console.error('Failed to save tasks to localStorage:', e);
  }
};

export const loadThemeFromStorage = () => {
  try {
    return localStorage.getItem(THEME_KEY) || 'dark';
  } catch {
    return 'dark';
  }
};

export const saveThemeToStorage = (theme) => {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (e) {
    console.error('Failed to save theme to localStorage:', e);
  }
};

export const exportTasksAsJSON = (tasks) => {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(tasks, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `focuslist_backup_${new Date().toISOString().split('T')[0]}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
};
