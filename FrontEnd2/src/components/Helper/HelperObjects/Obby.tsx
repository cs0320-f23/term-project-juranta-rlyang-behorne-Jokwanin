/**
 * Obby is a simple interface to contain the inputs given by the user
 * 
 * The command is the exact file that the user gives, 
 * currentFile is whatever the currently loaded file is at the time of the input
 * ViewMode is whatever the viewMode was at time of input
 */
type Obby = {
    command: string;
    output: JSX.Element;
}