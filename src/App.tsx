import { ErrorBoundary } from 'react-error-boundary';
import { CurrencyProvider, ErrorPage } from './components';
import { HomePage } from './pages/HomePage';

function App() {
  return (
    <>
      <ErrorBoundary fallback={<ErrorPage />}>
        <CurrencyProvider>
          <HomePage />
        </CurrencyProvider>
      </ErrorBoundary>
    </>
  );
}

export default App;
