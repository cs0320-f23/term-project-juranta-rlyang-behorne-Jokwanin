import {REPLFunction} from "./REPLFunction";
import loadFile from './Functions/loadFile';
import broadband from './Functions/broadband';
import view from './Functions/view'
import search from './Functions/search'


//A map that stores command names as keys and corresponding REPLFunction objects as values.
export const functionMap = new Map<string, REPLFunction>();

    //intiializes map with default REPl functions
    functionMap.set("load_file", new loadFile());
    functionMap.set("broadband", new broadband());
    functionMap.set("view", new view());
    functionMap.set("search", new search());

/**
 * adds a new REPL function to the function map 
 * 
 * @param method The name of the command.
 * @param givenFunction The REPLFunction object representing the command function.
 */
export function addToMap(method:string, givenFunction: REPLFunction){
    functionMap.set(method,givenFunction);
}

/**
 * Removes a REPL function from the function map based on the command name.
 * 
 * @param method he name of the command to be removed.
 */
export function removeFromMap(method:string){
    functionMap.delete(method);
}