import { REPLFunction } from "../REPLFunction";
import { CSVFormatter } from "../../Helper/HelperFunctions/CSVFormatter";

/**
 * This is the function used when the user calls view
 * Implementation of the REPLFunction interface for handling the view command 
 * @implements {REPLFunction}
 */
export class view implements REPLFunction {
    async execute(args: Array<string>): Promise<JSX.Element> {
      
      // Fetch data to be viewed from the specified URL
      const viewJson = await fetch(
        `http://localhost:3444/view?headers=true`
      ).then((response) => response.json());

      if (viewJson.response_type === "Success") {
        // Return view results as a CSV formatted table with headers
        return <CSVFormatter data={viewJson.data} headers={true} />;

      } else {
        //Returns the failure message if it does not work out correctly
        return viewJson.message;
      }
    }
  }
  
  export default view;