// Import custom Jest matchers from Testing Library for better assertions (e.g., toBeInTheDocument)
import '@testing-library/jest-dom/vitest';

// Provide a mock implementation of ResizeObserver for test environment
// Many UI components rely on ResizeObserver (e.g., scrollable containers, charts, or responsive layouts)
// Vitest/JSDOM does not implement ResizeObserver by default, so we define a global mock
globalThis.ResizeObserver = class ResizeObserver {
  observe() {
    // Called when observation starts
  }
  unobserve() {
    // Called when observation ends
  }
  disconnect() {
    // Called when all observations are removed
  }
};
