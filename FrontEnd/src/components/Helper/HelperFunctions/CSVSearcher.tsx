import './repl-rjecroi1-rlyang/FrontEnd/src/styles/main.css';
/**
 * This is function used to search through a CSV and find the wanted information
 * @param myData a 2D array of Lists representing the given CSV
 * @param column the column that the user wanted to search in
 * @param value the value that the user wanted to search for
 * @returns returns a 2D array of the wanted strings 
 */

  export function CSVSearcher(myData: string[][], column: string, value: string) { 
    let wantedRows: string[][] = [[]];
    //If we are searching through all the columns, then it just goes through every item
    //And sees if it matches the wanted item
    if(column === "all"){
        for (const item of myData){
            for (const item2 of item){
                if(value === item2){
                    //If the item matches then it adds it to the wanted row
                    wantedRows = [...wantedRows, item]
                }
            }
        }
    } else {
        //This is for the specific column searching side
        let numColumn = parseInt(column);
        //This if statement checks whether the wanted column is a number, if it is it
        //goes into the number search mode
        if(!isNaN(numColumn) && isFinite(numColumn) && numColumn <= myData[0].length){
            for (const item of myData){
                let thisSlot = 1;
                for (const item2 of item){
                    if(value === item2 && numColumn === thisSlot){
                        //The item will only be taken if both its value matches and its
                        //in the right column
                        wantedRows = [...wantedRows, item]
                    }
                    thisSlot++;
                }
            }
        } else {
            //This is the column searcher string version, searching to see if the headers
            //match with the wanted column
            let slot = 0;
            for(const header of myData[0]){
                if(column === header){
                    const columnNum = slot;
                    for (const item of myData){
                        let slot2 = 0;
                        for (const item2 of item){
                            if(value === item2 && columnNum === slot2){
                                //The item will only be taken if both its value matches and its
                                //in the right column
                                wantedRows = [...wantedRows, item]
                            }
                            slot2++;
                        }
                    }
                   
                }
                slot++;
            }        
        }
    }                 
    return wantedRows;
  }