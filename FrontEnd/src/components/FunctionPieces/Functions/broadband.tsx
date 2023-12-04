import { REPLFunction } from "../REPLFunction";
import { twoStateList } from "../../Helper/HelperObjects/TwoWordStates"; 

/**
 * This is a REPLFunction class that is used to handle broadband requests
 * Implementation of the REPLFunction interface for handling the broadband-related command 
 */
class broadband implements REPLFunction {
  async execute(args: Array<string>): Promise<JSX.Element> {
    if(args.length > 2){
      // Extract and process command arguments
      const lowerState: string = args[1].toLowerCase();
      let url: string = "";
      let countyName = "";

      // Constructs URL based on the amount of command arguments
      if (twoStateList.includes(lowerState)) {
        //If the given state is a two word state, it makes sure to recognize that
        args.forEach((value, index) => {
          if (!(index === 0 || index === 1 || index === 2)) {
            if (index === 3) {
              countyName = value;
            } else {
              //Puts spaces between each of the county names
              countyName = countyName + `%20` + value;
            }
          }
        });
        //The URL for two word states
        url = `http://localhost:3444/broadband?state=${
          args[1] + `%20` + args[2]
        }&county=${countyName}`;
      } else {
        //Constructing the URL for one word states
        args.forEach((value, index) => {
          if (!(index === 0 || index === 1)) {
            if (index === 2) {
              countyName = value;
            } else {
              countyName = countyName + `%20` + value;
            }
          }
        });
        url = `http://localhost:3444/broadband?state=${args[1]}&county=${countyName}`;
      }

      //Fetch broadband data from the specified URL
      const broadbandJson = await fetch(url).then((response) =>
        response.json()
      );
      console.log(broadbandJson);

      //Process and format the fetched data for display
      if (broadbandJson.type === "success") {
        console.log("right path");
        return (
          <div>
            Broadband access in {broadbandJson.county_name},{" "}
            {broadbandJson.state_name} is : {broadbandJson.percentage}%{" "}
            <br></br> Date and time retrieved:{" "}
            {broadbandJson.date_and_time_retrieved}
          </div>
        );
      } else {
        //If the fetch request fails sends back the details of the failure
        return broadbandJson.details;
      }
    } else {
      // Handle case when insufficient arguments are provided
            return  <div>You must include both the county and the state codes in your input </div>;
        }
  }
}
export default broadband;