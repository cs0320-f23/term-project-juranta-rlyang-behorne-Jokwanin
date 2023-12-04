import { useState } from 'react';
import '../../styles/main.css';
import { REPLHistory } from './REPLHistory';
import { REPLInput } from './REPLInput';
/* 
  You'll want to expand this component (and others) for the sprints! Remember 
  that you can pass "props" as function arguments. If you need to handle state 
  at a higher level, just move up the hooks and pass the state/setter as a prop.
  
  This is a great top level component for the REPL. It's a good idea to have organize all components in a component folder.
  You don't need to do that for this gearup.
*/
export default function REPL() {
  // A kind of shared state that holds all the commands submitted.
  const [history, setHistory] = useState<Obby[]>([])
  const [modeB, setModeB] = useState(true);
  const [currentFile, setCurrentFile] = useState<string[][]>([[]]);
  
  //const updateHistory
  return (
    <div className="repl">  
      {/*This is where the REPLHistory goes... You also may choose to add it within your REPLInput 
      component or somewhere else depending on your component organization. What are the pros and cons of each? */}
      {/* CHANGED */}
      <REPLHistory history ={history} modeB = {modeB} currentFile={currentFile}/>
      
      {modeB ? (
        <p>Current Mode: Brief</p>
      ) : (
        <p>Current Mode: Verbose</p>
        )}
      {/* CHANGED */}
      <REPLInput modeB = {modeB} history={history} setHistory={setHistory} setModeB={setModeB} 
      setCurrentFile={setCurrentFile} currentFile={currentFile}/>
    </div>
  );
}
