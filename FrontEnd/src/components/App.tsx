import '../styles/App.css';
import Searcher from './SearcherParts/Searcher';

/**
 * This is the highest level component!
 */
function App() {
  return (
    <div className="App">
      <div className="Movie Mapper"
      aria-lable = "Header for Movie Mapper"
      aria-description = "Movie Searcher">
        <h1 className="App-header"> Movie Mapper</h1>
      </div>
      <Searcher />      
    </div>
  );
}

export default App; 