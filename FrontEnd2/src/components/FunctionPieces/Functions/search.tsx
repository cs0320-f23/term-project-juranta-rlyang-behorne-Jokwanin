import {REPLFunction} from "../REPLFunction"
import { CSVFormatter } from "../../Helper/HelperFunctions/CSVFormatter";

/**
 * Implementation of the REPLFunction interface for handling the search command
 */
export class search implements REPLFunction {
  //Executes the search command to find specific data based on the provided search criteria.
  async execute(args: Array<string>): Promise<JSX.Element> {
    // The outputs for when the user asks for search
    //This function splits the args into one strong
    let searchString = "";
    args.forEach((value, index) => {
      if (!(index === 0)) {
        if (index === 1) {
          searchString = value;
        } else {
          searchString = searchString + `%20` + value;
        }
      }
    });
    //It then splits on , to find the right things
    // Split search criteria and values if multiple criteria are provided
    let searchSplit = searchString.split(",");
    searchSplit.forEach((value, index) => {
      searchSplit[index] = value.replace(/^%20+|%20+$/g, "");
    });
    let url: string = ``;
    if (searchSplit.length === 1) {
      //If they are searching in all the columns, this is the URL
      url = `http://localhost:3444/search?value=${searchSplit[0]}`;
    } else {
      //If searching in a specific column, this is the url
      let searchyValue = searchSplit.slice(1);
      const searchy: string = searchyValue.join(",");
      url = `http://localhost:3444/search?value=${searchy}&column=${searchSplit[0]}`;
    }
    console.log(url);

    // Fetch search results from the specified URL
    const searchJson = await fetch(url).then((response) => response.json());

    if (searchJson.response_type === "Success") {
      // Return search results as a CSV formatted table
      return <CSVFormatter data={searchJson.data} headers={false} />;
    } else {
      return searchJson.message;
    }
  }
}

export default search;
