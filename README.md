# 🧠 Quiz Maker

A modern, feature-rich web application for creating, managing, and "solving" quizzes. Built with **React 19**, **Vite**, and **Tailwind CSS 4**.

This project was developed as a technical task for Enterwell, focusing on clean architecture, maintainable code, and high-quality UI/UX.

## 🚀 Key Features

- **Full Quiz CRUD**: Create, read, update, and delete quizzes seamlessly.
- **"Solve" Mode**: Interactive slideshow experience for going through quiz questions.
- **Dynamic Question Recycling**: Reuse questions from previously created or even deleted quizzes.
- **Question Archiving**: A smart persistence layer in `localStorageService` ensures that questions are never lost, even if their parent quiz is deleted.
- **Responsive Design**: Fully optimized for desktop and mobile devices.
- **Mock API Layer**: A robust service layer that mimics a real REST API with simulated network delays.

## 🛠 Tech Stack

- **Core**: React 19, TypeScript
- **State Management**: [TanStack Query (React Query) v5](https://tanstack.com/query/latest) — for professional server-state synchronization and caching.
- **Styling**: Tailwind CSS 4.
- **Routing**: React Router 7.
- **Build Tool**: Vite.

## 🏗 Architecture Decisions

### 1. Feature-Driven Structure

The project is organized in `src/features`. Each feature (e.g., `quiz-management`, `quiz-solver`) encapsulates its logic, components, and types. This prevents the "folder-by-type" anti-pattern and makes the codebase highly scalable.

### 2. Service Layer (API Abstraction)

All API communication is abstracted via a service layer (`src/api`).

- `quizService` & `questionService`: Domain-specific services.
- `localStorageService`: A generic mock implementation of a REST client.
- **Pragmatic Implementation**: The service layer is designed to be swapped with a real HTTP client (like Axios or Fetch) with minimal effort (changing a single import).

### 3. Smart Question Retention

One of the specific requirements was to retain questions for recycling even after a quiz is deleted. This is handled at the service level using an `archiveQuestions` helper that maintains a global pool of unique questions in LocalStorage.

### 4. Robust State Management

By using React Query, the application handles loading states, error handling, and cache invalidation (e.g., automatic list refresh after delete/update) out of the box.

## 🚦 Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## 📝 Design Patterns & Principles

- **Container/Presenter Pattern**: Features are split into logical controllers (Containers) and representational sub-components (Presenters) within the same file for locality of behavior.
- **Repository Pattern**: Abstracting data access (LocalStorage) from business logic.
- **Single Responsibility**: Components and services are kept focused and modular.
