import '../../styles/main.css';
import { Dispatch, HtmlHTMLAttributes, SetStateAction, useState} from 'react';
import { ControlledInput } from '../Helper/HelperObjects/ControlledInput';
import {Filters} from './Filters'

/**
 * Represents the input field for the Read-Eval-Print Loop (REPL) interface.
 * Allows users to input commands, execute them, and display the output.
 */
interface MovieInputProps{
  modeB: boolean, 

  history: Obby[], // a list of string tuples with the command/input and output (or maybe can just be string[]) to be mapped
  setHistory: React.Dispatch<React.SetStateAction<Obby[]>>;
  setModeB: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentFile: React.Dispatch<React.SetStateAction<string[][]>>;
  currentFile: string[][];
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export function MovieInput(props : MovieInputProps) {
  // React manages state in your webapp.

  // Manages the contents of the input box
  const [commandString, setCommandString] = useState<string>("");
  const [toggle, setToggle] = useState<string>("filters");
  const [toggled, setToggled] = useState<boolean>(false);

  //Filter stuff
  const [isCheckedDate, setIsCheckedDate] = useState<boolean>(true);
  const [isCheckedScore, setIsCheckedScore] = useState<boolean>(true);
  const [minMonth, setMinMonth] = useState<string>("");
  const [maxMonth, setMaxMonth] = useState<string>("2024-12");

  const [minScore, setMinScore] = useState('');
  const [maxScore, setMaxScore] = useState('');
  /**
   * // This function is triggered when the button is clicked.
   * Parses the input, executes the command, and updates the history.
   */
  function handleSubmit(commandString: string) {
    if(commandString !== ""){
      const minSplit : string[] = minMonth.split("-");
      const maxSplit : string[] = maxMonth.split("-");

      const minYear : string = minSplit[0];
      const maxYear : string = maxSplit[0];
      const monthmin : string = minSplit[1];
      const monthmax : string = maxSplit[1];
      console.log(monthmin);

      let searchURL :string = `?search=` + commandString;
      if(minYear !== '' && isCheckedDate){
        searchURL = searchURL + `&minYear=`+ minYear +`&minMonth=`+ monthmin ;
      }
      if(maxYear !== '' && isCheckedDate){
        searchURL = searchURL +  `&maxYear=`+ maxYear +`&maxMonth=`+ monthmax;
      }
      if(minScore !== '' && isCheckedScore){
        searchURL = searchURL + `&minScore=`+ minScore ;
      }
      if(maxScore !== '' && isCheckedScore){
        searchURL = searchURL + `&maxScore=` + maxScore;
      }

      console.log(searchURL);
      props.setSearch(searchURL)
    }

  }
  function handleFilterClick(){
    if(toggle === "filters"){
      setToggle("toggled");
      setToggled(true);
    } else {
      setToggle("filters");
      setToggled(false);
    }
  }

  /**
   * Handles the key press event. If the Enter key is pressed, calls the handleSubmit method.
   */
  function handleEnterKeyPress(
    keyEvent: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (keyEvent.key === "Enter") {
      handleSubmit(commandString);
    }
  }

  /**
   * Renders the REPL Input field and submit button 
   * 
   * breaks down this component into smaller components
   */
  return (
    <div className="form-container">
      {/* This is a comment within the JSX. Notice that it's a TypeScript comment wrapped in
            braces, so that React knows it should be interpreted as TypeScript */}
      {/* I opted to use this HTML tag; you don't need to. It structures multiple input fields
            into a single unit, which makes it easier for screenreaders to navigate. */}
      <fieldset>
        <legend aria-description="this is a command line where you can type your searches press enter or press the the submit button to submit your command">
          Search Movies:
        </legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Search input"}
          onKeyDown={handleEnterKeyPress}
        />
      </fieldset>
      <div className="button-container">
        <button
          aria-label="submit Button"
          aria-description="Click this button to enter Searches"
          onClick={() => handleSubmit(commandString)}
        >
          Search!
        </button>
        <button className={toggle}
          aria-label="Filters Button"
          aria-description="Click this button to show Filters"
          onClick={() => handleFilterClick()}
        >
          Filters
        </button>

      </div>
      {toggled ? (
        <Filters isCheckedDate={isCheckedDate} setIsCheckedDate={setIsCheckedDate} 
        isCheckedScore = {isCheckedScore} setIsCheckedScore={setIsCheckedScore}
        minMonth={minMonth} setMinMonth={setMinMonth} maxMonth={maxMonth}
        setMaxMonth={setMaxMonth} minScore={minScore} setMinScore={setMinScore}
        maxScore={maxScore} setMaxScore={setMaxScore}></Filters>
      ): (
        <div></div>
      )}
    </div>
  );
}