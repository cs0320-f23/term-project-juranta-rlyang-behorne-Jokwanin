import '../../styles/main.css';


interface SearchResultsProps{
    results : String[];
}

export function SearchResults(props: SearchResultsProps){


    return(
        <div>
        
        <table>
            <tbody>
                <tr>
                <td style={{ width: '100px', height: '50px' }}>
                <img
                    // class="fit-picture"
                src="..\..\images\grapefruit-slice.jpg"
                alt="Grapefruit slice atop a pile of other slices" /> 
                <div><p>Green Needle Moveasdjhqwhkwqhjelfkjadshlfkjashlfkjqehekgljqlwefkjashlkfjahsdlkjfhwqlekjfhqlkwejfhalskdjfhals More</p></div>
                </td>
                <td>
                <img
                    // class="fit-picture"
                src="..\..\images\grapefruit-slice.jpg"
                alt="Grapefruit slice atop a pile of other slices" /> 
                </td>
                <td>
                <img
                    // class="fit-picture"
                src="..\..\images\grapefruit-slice.jpg"
                alt="Grapefruit slice atop a pile of other slices" /> 
                </td>
                <td>
                <img
                    // class="fit-picture"
                src="..\..\images\grapefruit-slice.jpg"
                alt="Grapefruit slice atop a pile of other slices" /> 
                </td>
                </tr>
            </tbody>
        </table>

        
        <img
            // class="fit-picture"
            src="..\..\images\grapefruit-slice.jpg"
            alt="Grapefruit slice atop a pile of other slices" /> 
        </div>
    )

}