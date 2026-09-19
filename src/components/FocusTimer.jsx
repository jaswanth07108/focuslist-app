import React, { useState, useEffect } from 'react';
import { IconPlay, IconPause, IconRotateCcw, IconCheck, IconSparkles } from './Icons';
import { playTimerAlarmSound } from '../utils/audio';

export const FocusTimer = ({ selectedTask, tasks, onToggleComplete, onSelectTask }) => {
  const [timerMode, setTimerMode] = useState('focus'); // 'focus' (25m) | 'short' (5m) | 'long' (15m)
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);

  // Set default initial timer duration based on timerMode
  const getInitialTime = (mode) => {
    switch (mode) {
      case 'focus':
        return 25 * 60;
      case 'short':
        return 5 * 60;
      case 'long':
        return 15 * 60;
      default:
        return 25 * 60;
    }
  };

  const handleModeChange = (newMode) => {
    setTimerMode(newMode);
    setIsRunning(false);
    setTimeLeft(getInitialTime(newMode));
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(getInitialTime(timerMode));
  };

  // Timer interval effect
  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      setIsRunning(false);
      playTimerAlarmSound();
      setCompletedSessions((prev) => prev + 1);

      if (timerMode === 'focus' && selectedTask) {
        // Automatically mark task completed or notify user
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, timerMode, selectedTask]);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const totalDuration = getInitialTime(timerMode);
  const progressPercent = ((totalDuration - timeLeft) / totalDuration) * 100;
  const strokeDashoffset = 440 - (440 * progressPercent) / 100;

  return (
    <section className="focus-timer-card" aria-label="Pomodoro Focus Timer">
      <div className="timer-header">
        <div className="timer-mode-selector" role="tablist">
          <button
            role="tab"
            aria-selected={timerMode === 'focus'}
            onClick={() => handleModeChange('focus')}
            className={`timer-tab ${timerMode === 'focus' ? 'active' : ''}`}
          >
            🎯 Focus (25m)
          </button>
          <button
            role="tab"
            aria-selected={timerMode === 'short'}
            onClick={() => handleModeChange('short')}
            className={`timer-tab ${timerMode === 'short' ? 'active' : ''}`}
          >
            ☕ Short Break (5m)
          </button>
          <button
            role="tab"
            aria-selected={timerMode === 'long'}
            onClick={() => handleModeChange('long')}
            className={`timer-tab ${timerMode === 'long' ? 'active' : ''}`}
          >
            🌴 Long Break (15m)
          </button>
        </div>
      </div>

      {/* Target Task Selector */}
      <div className="target-task-selector">
        <label htmlFor="target-task-select" className="text-xs font-semibold text-slate-400">
          Target Task:
        </label>
        <select
          id="target-task-select"
          value={selectedTask?.id || ''}
          onChange={(e) => {
            const task = tasks.find((t) => t.id === e.target.value);
            onSelectTask(task || null);
          }}
          className="target-task-dropdown"
        >
          <option value="">-- Free Focus (No task linked) --</option>
          {tasks
            .filter((t) => !t.completed)
            .map((t) => (
              <option key={t.id} value={t.id}>
                [{t.priority}] {t.title}
              </option>
            ))}
        </select>
      </div>

      {/* Circular Progress & Clock Display */}
      <div className="timer-display-container">
        <svg className="timer-svg" viewBox="0 0 160 160">
          {/* Background circle */}
          <circle
            cx="80"
            cy="80"
            r="70"
            className="timer-circle-bg"
          />
          {/* Animated Progress circle */}
          <circle
            cx="80"
            cy="80"
            r="70"
            className="timer-circle-progress"
            style={{
              strokeDasharray: 440,
              strokeDashoffset: strokeDashoffset
            }}
          />
        </svg>

        <div className="timer-text-content">
          <span className="timer-clock">{formatTime(timeLeft)}</span>
          <span className="timer-status-text">
            {isRunning ? (timerMode === 'focus' ? 'Deep Work Session' : 'Rest & Recharge') : 'Ready to Focus'}
          </span>
        </div>
      </div>

      {/* Controls: Play/Pause, Reset, Complete Task */}
      <div className="timer-controls-row">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`btn-timer-primary ${isRunning ? 'btn-timer-pause' : 'btn-timer-play'}`}
          aria-label={isRunning ? "Pause Timer" : "Start Timer"}
        >
          {isRunning ? <IconPause className="w-6 h-6" /> : <IconPlay className="w-6 h-6 ml-0.5" />}
          <span>{isRunning ? 'Pause' : 'Start Focus'}</span>
        </button>

        <button
          onClick={resetTimer}
          className="btn btn-secondary btn-icon"
          title="Reset Timer"
          aria-label="Reset Timer"
        >
          <IconRotateCcw className="w-5 h-5" />
        </button>

        {selectedTask && (
          <button
            onClick={() => onToggleComplete(selectedTask.id)}
            className="btn btn-success btn-icon"
            title="Mark linked task as completed"
            aria-label="Mark task completed"
          >
            <IconCheck className="w-5 h-5 mr-1" />
            <span>Complete Task</span>
          </button>
        )}
      </div>

      {/* Session Stats */}
      <div className="timer-footer-stats">
        <IconSparkles className="w-4 h-4 text-amber-400" />
        <span>Completed Sessions Today: <strong>{completedSessions}</strong></span>
      </div>
    </section>
  );
};
