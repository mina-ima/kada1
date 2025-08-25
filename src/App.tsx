import BirthdateForm from './features/birthdate/BirthdateForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>年齢・和暦変換ツール</h1>
      </header>
      <main>
        <BirthdateForm />
      </main>
    </div>
  );
}

export default App;