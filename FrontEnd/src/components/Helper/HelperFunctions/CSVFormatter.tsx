import '../../../styles/main.css';
/**
 * This is a class that formats given CSVs into HTML tables
 * data: a 2D array of strings that represents the given CSV
 * headers: whether or not the given CSV has headers
 */
interface CSVFormatterProps {
  data: string[][];
  headers: boolean;
}

  export function CSVFormatter(props : CSVFormatterProps) {
    //This is a helper function that maps each row to a piece of an HTML table

    function formatRow(row : string[]){
        return(  
            <tr>
            {row.map((eachItem) => {return <td> {eachItem} </td>})}
            </tr>
            )
    }
    //This is a way to get the headers from the data, to change the format of it

    const [firstItem, ...restOfArray] = props.data;        

    return (
        //If the given CSV does not have headers it formats the table differently
        <div>
        { props.headers ? (
            <table>
                <thead>

                    {formatRow(firstItem)} 
                </thead>
                <tbody>
                    {restOfArray.map((eachRow) => {return formatRow(eachRow)})}
                </tbody>
            </table>
        ) : (
            <table>
                <tbody>
                    {props.data.map((eachRow) => {return formatRow(eachRow)})}
                </tbody>
            </table>
        )
        }   
        </div>
    );

  }
	