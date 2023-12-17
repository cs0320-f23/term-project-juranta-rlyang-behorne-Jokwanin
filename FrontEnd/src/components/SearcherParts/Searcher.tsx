import { useState } from 'react';
import '../../styles/main.css';
import { MovieInput } from './MovieInput';
import { SearchResults } from './SearchResults';
/* 
  You'll want to expand this component (and others) for the sprints! Remember 
  that you can pass "props" as function arguments. If you need to handle state 
  at a higher level, just move up the hooks and pass the state/setter as a prop.
  
  This is a great top level component for the REPL. It's a good idea to have organize all components in a component folder.
  You don't need to do that for this gearup.
*/
export default function Searcher() {
  // A kind of shared state that holds all the commands submitted.
  const [history, setHistory] = useState<Obby[]>([])
  const [modeB, setModeB] = useState(true);
  const [currentFile, setCurrentFile] = useState<string[][]>([[]]);
  const [search, setSearch] = useState<string>("");

  const [compare, setCompare] = useState<boolean>(false);

  //const updateHistory
  return (
    <div className="Searcher">  
      <MovieInput modeB = {modeB} history={history} setHistory={setHistory} setModeB={setModeB} 
      setCurrentFile={setCurrentFile} currentFile={currentFile} setSearch={setSearch}
      setCompare={setCompare}/>
      <SearchResults search = {search} setSearch={setSearch} compare={compare} 
      setCompare={setCompare}/>
    </div>
  );
}
	