import '../styles/App.css';
import REPL from './SearcherParts/Searcher';

/**
 * This is the highest level component!
 */
function App() {
  return (
    <div className="App">
      <p className="Movie Mapper"
      aria-lable = "Header for Movie Mapper"
      aria-description = "Movie Searcher">
        <h1 className="App-header"> Movie Mapper</h1>
      </p>
      <REPL />      
    </div>
  );
}

export default App; 