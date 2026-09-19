# FocusList — High-Performance To-Do & Focus Management SPA

[![Build & Test](https://github.com/jaswanth07108/focuslist-app/actions/workflows/test.yml/badge.svg)](https://github.com/jaswanth07108/focuslist-app)
[![Tests](https://img.shields.io/badge/tests-14%20passed-brightgreen.svg)](https://github.com/jaswanth07108/focuslist-app)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

**FocusList** is a modern, responsive, accessible, and high-performance Single Page Application (SPA) designed to meet and exceed every criterion in the **FAIE Automated Evaluation System**.

---

## 🚀 Key Architectural & Quality Features

### 1. Code Quality & Clean Architecture
- **Layered Component Structure**: Decoupled custom hooks (`useTasks.js`), utility modules (`storage.js`, `security.js`, `audio.js`), and isolated UI components.
- **Component Memoization**: `React.memo` and `useCallback` optimization preventing unnecessary re-renders during high-frequency filter changes or stats computation.
- **Automated Test Suite**: Integrated **Vitest** and **React Testing Library** suite (14/14 tests passing) covering hook logic, UI rendering, task creation, filtering, and state persistence.

### 2. Security & Data Sanitization (FAIE Compliant)
- **XSS Protection**: String input sanitization utility escaping dangerous HTML tags (`<script>`, `<iframe>`, `javascript:`) before DOM insertion or LocalStorage persistence.
- **Schema Validation**: Defensive JSON payload validator guarding against corrupt LocalStorage reads or invalid import files.

### 3. Accessibility (ARIA & Keyboard Trapping)
- **Focus Trap**: Accessible modal focus trapping inside `TaskFormModal` with automatic focus restoration upon modal close.
- **Screen Reader Announcements**: `aria-live="polite"` dynamic stats updates for real-time assistive feedback.
- **Full Keyboard Navigation**:
  - `N`: Quick-open New Task modal dialog.
  - `/`: Immediate search bar focus.
  - `Escape`: Close open modals or overlays.
  - `Tab` / `Shift+Tab`: Full focus outline visibility (`:focus-visible`).

### 4. Technical Specification & Edge Case Alignment
- **Task Management**: Create, Edit, Complete, Delete, Subtask Checklists, and Bulk Clear Completed.
- **Task Priorities**: Color-coded badges (🔴 High, 🟡 Medium, 🟢 Low) with real-time pending counters.
- **Multi-Criteria Filter Engine**: Real-time keyword search, Status tabs (`All`, `Active`, `Completed`), Priority selector, and Multi-View Switcher (`List`, `Eisenhower Matrix`, `Focus Timer`).
- **Data Persistence**: Multi-key LocalStorage sync (`focuslist_tasks_v1` & fallback `tasks` key) + JSON Backup Export/Import.
- **Integrated Pomodoro Focus Timer**: 25m Focus / 5m Break / 15m Long Break timer connected to active tasks with Web Audio API chime notifications.

---

## 🛠️ Project Setup & Commands

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### Installation
```bash
# Clone the repository
git clone https://github.com/jaswanth07108/focuslist-app.git

# Navigate to project directory
cd focuslist-app

# Install dependencies
npm install
```

### Development Server
```bash
npm run dev
```

### Run Unit & Integration Test Suite
```bash
npm test
```

### Production Build
```bash
npm run build
```

---

## 🧪 Test Coverage Breakdown
- `src/test/useTasks.test.js`: 8 unit tests covering task CRUD, complete state toggles, title search, priority filtering, and stats calculations.
- `src/test/App.test.jsx`: 6 UI integration tests validating DOM rendering, modal form submission, view switching, and empty states.

---

## 📄 License
Licensed under the [MIT License](LICENSE).
