import '../styles/App.css';
import REPL from './REPLParts/REPL';

/**
 * This is the highest level component!
 */
function App() {
  return (
    <div className="App">
      <p className="App-header"
      aria-lable = "Header for REPL"
      aria-description = "REPL Application">
        <h1>REPL</h1>
      </p>
      <REPL />      
    </div>
  );
}

export default App; 