import { StrictMode } from 'react';
// Import ReactDOM's createRoot API for concurrent rendering
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

// Import React Query's core components for managing server state
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a new instance of QueryClient to manage caching and fetching of data
const queryClient = new QueryClient();

// Render the React app into the DOM element with id 'root'
// Wrap the app in StrictMode for development checks
// Wrap the app in QueryClientProvider to provide access to React Query across the app
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
