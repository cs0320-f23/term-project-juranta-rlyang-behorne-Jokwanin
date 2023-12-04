import '../../styles/main.css';

/**
 * This class contains all of the scrollable history of the website, it formats every input into
 * a viewable mode, sometimes using helper function things like the CSVFormatter and CSVSearcher
 */
interface REPLHistoryProps{
   // history: string[],
   currentFile: string[][],
   history: Obby[], // history: Obby[], // a list of string tuples with the command/input and output (or maybe can just be string[]) to be mapped
   modeB: boolean; // delete (maybe) when u do REPL.tsx bc modeB should be toggled/initialized there
}

export function REPLHistory(props : REPLHistoryProps) {
    //const modeB = true;
    function handleHistory(currentObby: Obby){

        //If the input fulfills none of the switch cases then it is this
        let output = currentObby.output
        //Gets the data and headers from the currently loaded file

    //Formats each command and output
    if (props.modeB === true) {
      return <p key={currentObby.command}>Output: {output}</p>; // console.log("Output: " + output);
    } else {
      return (
        <p key={currentObby.command}>
          Command: {currentObby.command}
          <br></br> Output: {output}
        </p>
      ); 
    }
  }
  return (
    //This map function goes through every item in history and sends it to the handler
    <div
      className="repl-history"
      role="log"
      aria-live="assertive"
      aria-relevant="additions"
    >
      {props.history.map((eachString) => {
        return handleHistory(eachString);
      })}
    </div>
  );
}
