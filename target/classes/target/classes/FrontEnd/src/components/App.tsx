import '../styles/App.css';
import Searcher from './SearcherParts/Searcher';

/**
 * This is the highest level component!
 */
function App() {
  return (
    <div>
      <h1>Hello World</h1>
    <div className="App">
      
      <div className="Movie Mapper"
      aria-lable = "Header for Movie Mapper"
      aria-description = "Movie Searcher">
        <h1 className="App-header"> Movie Mapper</h1>
      </div>
      <Searcher />      
    </div>

    </div>
  );
}

export default App; 