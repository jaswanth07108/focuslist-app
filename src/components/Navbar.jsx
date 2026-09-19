import React from 'react';
import { IconSun, IconMoon, IconDownload, IconUpload, IconRotateCcw, IconSparkles, IconFlame } from './Icons';
import { exportTasksAsJSON } from '../utils/storage';

export const Navbar = ({ theme, toggleTheme, tasks, onImport, onReset }) => {
  const handleFileImport = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          if (Array.isArray(parsed)) {
            onImport(parsed);
          } else {
            alert('Invalid JSON file format. Expected array of tasks.');
          }
        } catch (err) {
          alert('Error parsing JSON backup file.');
        }
      };
      reader.readAsText(file);
    }
  };

  const streakCount = tasks.filter(t => t.completed).length;

  return (
    <header className="navbar-header" role="banner">
      <div className="navbar-container">
        {/* Brand logo & tagline */}
        <div className="brand-badge">
          <div className="brand-icon-wrapper">
            <IconSparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="brand-title">FocusList</h1>
            <p className="brand-subtitle">Build • Organize • Simplify</p>
          </div>
        </div>

        {/* Global Controls & Actions */}
        <div className="navbar-actions">
          {/* Productivity Streak Counter */}
          <div className="streak-badge" title="Completed Tasks Counter">
            <IconFlame className="w-4 h-4 text-amber-400" />
            <span className="streak-text">{streakCount} Completed</span>
          </div>

          {/* Export Tasks JSON */}
          <button
            onClick={() => exportTasksAsJSON(tasks)}
            className="btn btn-secondary"
            title="Backup & Export Tasks as JSON"
            aria-label="Export Tasks"
          >
            <IconDownload className="w-4 h-4" />
            <span className="btn-label-desktop">Export</span>
          </button>

          {/* Import JSON - Hidden File Input */}
          <label className="btn btn-secondary cursor-pointer" title="Import Tasks JSON" aria-label="Import Tasks">
            <IconUpload className="w-4 h-4" />
            <span className="btn-label-desktop">Import</span>
            <input
              type="file"
              accept=".json"
              onChange={handleFileImport}
              style={{ display: 'none' }}
            />
          </label>

          {/* Reset Demo Data */}
          <button
            onClick={onReset}
            className="btn btn-secondary"
            title="Reset to Sample Demo Tasks"
            aria-label="Reset Tasks"
          >
            <IconRotateCcw className="w-4 h-4" />
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="btn-theme-toggle"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? (
              <IconSun className="w-5 h-5 text-amber-400" />
            ) : (
              <IconMoon className="w-5 h-5 text-indigo-600" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
