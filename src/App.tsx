import { AppProvider } from './context/AppContext';
import RetirementForm from './features/retirement/RetirementForm';
import SeniorityForm from './features/seniority/SeniorityForm';
import RetirementIncomeForm from './features/retirementIncome/RetirementIncomeForm';
import { Tabs, Tab } from './components/Tabs';
import BirthdateForm from './features/birthdate/BirthdateForm';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <header className="w-full bg-blue-800 text-white p-4 shadow-md text-center">
        <h1 className="text-3xl font-bold">年齢・和暦・勤続年数計算ツール (v2)</h1>
      </header>
      <main className="flex-grow container mx-auto mt-8 bg-white rounded-lg shadow-lg">
        <AppProvider>
          <Tabs>
            <Tab label="年齢・和暦">
              <BirthdateForm />
            </Tab>
            <Tab label="勤続年数">
              <SeniorityForm />
            </Tab>
            <Tab label="定年まで">
              <RetirementForm />
            </Tab>
            <Tab label="退職所得">
              <RetirementIncomeForm />
            </Tab>
          </Tabs>
        </AppProvider>
      </main>
      <footer className="w-full bg-blue-800 text-white p-4 mt-8 text-center text-sm">
        &copy; 2025 年齢・和暦・勤続年数計算ツール
      </footer>
    </div>
  );
}

export default App;