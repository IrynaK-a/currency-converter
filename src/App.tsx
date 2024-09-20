import { CurrencyProvider } from './components';
import { HomePage } from './pages/HomePage';

function App() {
  return (
    <>
      <CurrencyProvider>
        <HomePage />
      </CurrencyProvider>
    </>
  );
}

export default App;
