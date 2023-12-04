import {REPLFunction} from "../REPLFunction"

/**
 * This is a useless function implemented by REPLfunction to 
 * be used for testing
 */
export class mockFunction implements REPLFunction {
  async execute(args: Array<string>): Promise<JSX.Element> {
    return <div>Success</div>;
    //return <div>{args.join(", ")}</div>;
  }
}

export default mockFunction;





