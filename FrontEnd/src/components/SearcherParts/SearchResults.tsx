import '../../styles/main.css';


interface SearchResultsProps{
    results : String[];
}

export function SearchResults(props: SearchResultsProps){


    return(
        <div>
            <br></br>
            <br></br>
            <br></br>
        <table className="center" >
            <tbody>
                {/* ROW 1 */}
                <tr>
                <td className='scrollable-cell'>
                
                <div className='description-div'>
                    <div> 
                    <img // class="fit-picture"
                    src="https://image.tmdb.org/t/p/original/prSfAi1xGrhLQNxVSUFh61xQ4Qy.jpg"
                    alt="Grapefruit slice atop a pile of other slices" />
                    <p></p>
                    START Verbose Filler Text 
                    Verbose Filler Text Verbose Filler Text Verbose Filler Text 
                    Verbose Filler Text Verbose Filler Text Verbose Filler Text 
                    Verbose Filler Text Verbose Filler Text Verbose Filler Text 
                    Verbose Filler Text Verbose Filler Text Verbose Filler Text 
                    Verbose Filler Text Verbose Filler Text Verbose Filler Text 
                    Verbose Filler Text Verbose Filler Text Verbose Filler Text 
                    Verbose Filler Text Verbose Filler Text Verbose Filler Text 
                    Verbose Filler Text Verbose Filler Text Verbose Filler Text 
                    END</div></div>
                </td>
                <td className='scrollable-cell'>
                
                <div className='description-div'>
                    
                    <div> 
                    <img // class="fit-picture"
                    src="..\..\images\lalaland.jpg"
                    alt="Grapefruit slice atop a pile of other slices" />
                    <p></p>
                    START Verbose Filler Text 
                    Verbose Filler Text Verbose Filler Text Verbose Filler Text 
                    Verbose Filler Text Verbose Filler Text Verbose Filler Text 
                    Verbose Filler Text Verbose Filler Text Verbose Filler Text 
                    Verbose Filler Text Verbose Filler Text Verbose Filler Text 
                    Verbose Filler Text Verbose Filler Text Verbose Filler Text 
                    Verbose Filler Text Verbose Filler Text Verbose Filler Text 
                    Verbose Filler Text Verbose Filler Text Verbose Filler Text 
                    Verbose Filler Text Verbose Filler Text Verbose Filler Text 
                    END</div></div> 
                </td>
                <td className='scrollable-cell'>
                
                <div className='description-div'>
                    <img
                        // class="fit-picture"
                    src="..\..\images\grapefruit-slice.jpg"
                    alt="Grapefruit slice atop a pile of other slices" />
                    <p> 
                     Filler Text</p></div> 
                </td>
                {/* <td className='scrollable-cell'>
                <img
                    // class="fit-picture"
                src="..\..\images\grapefruit-slice.jpg"
                alt="Grapefruit slice atop a pile of other slices" /> 
                <div className='description-div'><p> Filler Text</p></div> 
                </td> */}
                </tr>
                <br></br>
                <br></br>
                <br></br>
                {/* ROW 2 */}
                <tr>
                <td className='scrollable-cell'>
                 
                <div className='description-div'>
                    <img
                        // class="fit-picture"
                    src="..\..\images\grapefruit-slice.jpg"
                    alt="Grapefruit slice atop a pile of other slices" />
                    <p> START Verbose Filler Text 
                    Verbose Filler Text Verbose Filler Text Verbose Filler Text 
                    Verbose Filler Text Verbose Filler Text Verbose Filler Text 
                    Verbose Filler Text Verbose Filler Text Verbose Filler Text 
                    Verbose Filler Text Verbose Filler Text Verbose Filler Text 
                    Verbose Filler Text Verbose Filler Text Verbose Filler Text 
                    Verbose Filler Text Verbose Filler Text Verbose Filler Text 
                    Verbose Filler Text Verbose Filler Text Verbose Filler Text 
                    Verbose Filler Text Verbose Filler Text Verbose Filler Text 
                    END</p></div>
                </td>
                <td className='scrollable-cell'>
                <img
                    // class="fit-picture"
                src="..\..\images\grapefruit-slice.jpg"
                alt="Grapefruit slice atop a pile of other slices" />
                <div className='description-div'><p> Filler Text</p></div> 
                </td>
                <td className='scrollable-cell'>
                <img
                    // class="fit-picture"
                src="..\..\images\grapefruit-slice.jpg"
                alt="Grapefruit slice atop a pile of other slices" /> 
                <div className='description-div'><p> Filler Text</p></div> 
                </td>
                {/*<td className='scrollable-cell'>
                <img
                    // class="fit-picture"
                src="..\..\images\grapefruit-slice.jpg"
                alt="Grapefruit slice atop a pile of other slices" /> 
                <div className='description-div'><p> Filler Text</p></div> 
                </td> */}
                </tr>
                <br></br>
                <br></br>
                <br></br>
                {/* ROW 3 */}
                <tr>
                <td className='scrollable-cell'>
                
                <div className='description-div'>
                    <img
                        // class="fit-picture"
                    src="..\..\images\grapefruit-slice.jpg"
                    alt="Grapefruit slice atop a pile of other slices" /> 
                    <p> START Verbose Filler Text 
                    Verbose Filler Text Verbose Filler Text Verbose Filler Text 
                    Verbose Filler Text Verbose Filler Text Verbose Filler Text 
                    Verbose Filler Text Verbose Filler Text Verbose Filler Text 
                    Verbose Filler Text Verbose Filler Text Verbose Filler Text 
                    Verbose Filler Text Verbose Filler Text Verbose Filler Text 
                    Verbose Filler Text Verbose Filler Text Verbose Filler Text 
                    Verbose Filler Text Verbose Filler Text Verbose Filler Text 
                    Verbose Filler Text Verbose Filler Text Verbose Filler Text 
                    END</p></div>
                </td>
                <td className='scrollable-cell'>
                <img
                    // class="fit-picture"
                src="..\..\images\grapefruit-slice.jpg"
                alt="Grapefruit slice atop a pile of other slices" />
                <div className='description-div'><p> Filler Text</p></div> 
                </td>
                <td className='scrollable-cell'>
                <img
                    // class="fit-picture"
                src="..\..\images\grapefruit-slice.jpg"
                alt="Grapefruit slice atop a pile of other slices" /> 
                <div className='description-div'><p> Filler Text</p></div> 
                </td>
                {/* <td className='scrollable-cell'>
                <img
                    // class="fit-picture"
                src="..\..\images\grapefruit-slice.jpg"
                alt="Grapefruit slice atop a pile of other slices" /> 
                <div className='description-div'><p> Filler Text</p></div> 
                </td> */}
                </tr>
            </tbody>
        </table>

        </div>
    )

}
