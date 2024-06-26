import React from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './ui/ErrorFallback';

import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ErrorBoundary
    FallbackComponent={ErrorFallback}
    onReset={() => window.location.replace('/')}
  >
    <App />
  </ErrorBoundary>
);
