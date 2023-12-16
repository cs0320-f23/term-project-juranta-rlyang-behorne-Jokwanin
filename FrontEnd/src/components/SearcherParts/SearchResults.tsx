import { useEffect } from 'react';
import { getResults } from './getResults';
import { useState } from 'react';
import '../../styles/main.css';


interface SearchResultsProps{
    search : String;
}

export function SearchResults(props: SearchResultsProps){
    const [movieResults, setMovieResults] = useState<string[]>([]);

    useEffect(() => {
        getResults(props.search).then(resultJSON => {
            //setImageSRC(["https://image.tmdb.org/t/p/original/" + resultJSON.first.poster_path])
            setMovieResults(resultJSON);
        });
        
    }, [props.search]);

    function formatRow(movie : any){
        return(  
                <tr>
                <td className='scrollable-cell'>
                
                <div className='description-div'>
                    <div> 
                    <img
                    src={"https://image.tmdb.org/t/p/original/" + movie.poster_path}
                    alt={movie.title} />
                    {movie.title + "-->"}
                    {movie.overview}
                    <p></p>
                    {movie.release_date}
                    <p></p>
                    {movie.vote_average}
                    </div></div>
                </td>
                </tr>
            )
    }
    if(movieResults.length === 0){
        return(
            <div>
                <br></br>
                <table className="center" >
                <tbody>
                    <div>No Results!</div>
                </tbody>
            </table>
            </div>
        )
    } else {
        return(
            <div>
                <br></br>
                <table className="center" >
                <tbody>
                    {movieResults.map((eachMovie) => {
                        return formatRow(eachMovie);
                    })}
                </tbody>
            </table>
            </div>
        )
    }
    


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
                    src=""
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
                    src=""
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
                    src=""
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
