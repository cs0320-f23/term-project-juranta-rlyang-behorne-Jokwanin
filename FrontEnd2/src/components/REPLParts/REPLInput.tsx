import '../../styles/main.css';
import { Dispatch, HtmlHTMLAttributes, SetStateAction, useState} from 'react';
import { ControlledInput } from '../Helper/HelperObjects/ControlledInput';
import { functionMap } from '../FunctionPieces/FunctionMap';

/**
 * Represents the input field for the Read-Eval-Print Loop (REPL) interface.
 * Allows users to input commands, execute them, and display the output.
 */
interface REPLInputProps{
  modeB: boolean, 

  history: Obby[], // a list of string tuples with the command/input and output (or maybe can just be string[]) to be mapped
  setHistory: React.Dispatch<React.SetStateAction<Obby[]>>;
  setModeB: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentFile: React.Dispatch<React.SetStateAction<string[][]>>;
  currentFile: string[][];
}

export function REPLInput(props : REPLInputProps) {
  // React manages state in your webapp.

  // Manages the contents of the input box
  const [commandString, setCommandString] = useState<string>("");
  // Manages the current amount of times the button is clicked
  const [count, setCount] = useState<number>(0);

  /**
   * // This function is triggered when the button is clicked.
   * Parses the input, executes the command, and updates the history.
   */
  async function handleSubmit(commandString: string) {
    const split = commandString.split(" ");
    let output: JSX.Element = (
      <div>
        Your input "{commandString}" did not match any expected commands{" "}
      </div>
    );
    const command = split[0].toLowerCase();

    // Retrieves the corresponding function for the command from the functionMap 
    //which maps string command to corresponding function 
    const commandFunction = functionMap.get(command);
    
    //if a valid function is found, execute the command 
    if (commandFunction !== undefined) {
      output = await commandFunction.execute(split);
    }

    //handles modes commands
    if (split[0] === "mode") {
      if (split.length > 1) {
        //This is how the mode command is handled when brief and verbose are given
        if (split[1].toLowerCase() === "verbose") {
          output = <div>Changed view to Verbose </div>;
          props.setModeB(false);
        } else if (split[1].toLowerCase() === "brief") {
          output = <div>Changed view to Brief </div>;
          props.setModeB(true);
        } else {
          //This is how the mode command is handled when another word is given, but
          //it's not brief or verbose
          //it just switches the mode
          if (props.modeB) {
            output = <div>Changed view to Verbose </div>;
          } else {
            output = <div>Changed view to Brief </div>;
          }
          props.setModeB(!props.modeB);
        }
      } else {
        // Toggle between verbose and brief modes if no mode argument is provided

        if (props.modeB) {
          output = <div>Changed view to Verbose </div>;
        } else {
          output = <div>Changed view to Brief </div>;
        }
        props.setModeB(!props.modeB);
      }
    }

    //prepare new hisotry entry 
    const newObby = {
      command: commandString,
      output: output,
    };

    //update command history and count 
    props.setHistory([...props.history, newObby]);
    setCount(count + 1);

    //clears the input box after submission
    setCommandString("");
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
    <div className="repl-input">
      {/* This is a comment within the JSX. Notice that it's a TypeScript comment wrapped in
            braces, so that React knows it should be interpreted as TypeScript */}
      {/* I opted to use this HTML tag; you don't need to. It structures multiple input fields
            into a single unit, which makes it easier for screenreaders to navigate. */}
      <fieldset>
        <legend aria-description="this is a command line where you can type your commands press enter or press the the submit button to submit your command">
          Enter a command:
        </legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
          onKeyDown={handleEnterKeyPress}
        />
      </fieldset>
      {/* TODO: Currently this button just counts up, can we make it push the contents of the input box to the history?*/}
      <button
        aria-label="submit Button"
        aria-description="Click this button to enter commands"
        onClick={() => handleSubmit(commandString)}
      >
        Submitted {count} times
      </button>
    </div>
  );
}