import { AppProvider } from './context/AppContext';
import BirthdateForm from './features/birthdate/BirthdateForm';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <header className="w-full bg-blue-800 text-white p-4 shadow-md text-center">
        <h1 className="text-sm font-bold">年齢・和暦・勤続年数計算ツール (v2)</h1>
      </header>
      <main className="flex-grow container mx-auto mt-8 bg-white rounded-lg shadow-lg p-4">
        <AppProvider>
          <BirthdateForm />
        </AppProvider>
      </main>
      <footer className="w-full bg-blue-800 text-white p-4 mt-8 text-center text-sm">
        &copy; 2025 年齢・和暦・勤続年数計算ツール
      </footer>
    </div>
  );
}

export default App;