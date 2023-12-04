import {REPLFunction} from "../REPLFunction"

/**
 * This is a REPLFunction class that is used to handle load_file requests
 *  Implementation of the REPLFunction interface for handling the file loading command
 */
export class loadFile implements REPLFunction {
  async execute(args: Array<string>): Promise<JSX.Element> {
    // Extract the file path from the command arguments
    const filePath = args[1];

    //construct the url
    const url: string = `http://localhost:3444/load?filepath=${filePath}`;
    const loadJson = await fetch(url).then((response) => response.json());

    // Process and format the fetched data for display
    if (loadJson.response_type === "Success") {

      return <div>Successfully loaded file: {filePath}</div>;
    } else {
      //If it did not successfully load, it sends the response message
      return <div>Error loading file: {loadJson.message}</div>;
    }
  }
}

export default loadFile;





