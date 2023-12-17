import { useEffect } from 'react';
import { getResults } from './getResults';
import { useState } from 'react';
import '../../styles/main.css';


interface SearchResultsProps{
    search : String;
}

function handleSimilarMovies() {
    

  }

export function SearchResults(props: SearchResultsProps){
    const [movieResults, setMovieResults] = useState<string[]>([]);

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if(props.search !== ''){
            setLoading(true);
        
            getResults(props.search).then(resultJSON => {
                //setImageSRC(["https://image.tmdb.org/t/p/original/" + resultJSON.first.poster_path])
                setLoading(false);
                setMovieResults(resultJSON);
        });
        }
        
        
    }, [props.search]);

    function formatRow(movie : any){
        return(  
                <tr>
                <td className='scrollable-cell'>
                <div className='description-div'>
                <div className="similar-movie-container">
                    <div className='img-and-button'> 
                    <img
                    src={"https://image.tmdb.org/t/p/original/" + movie.poster_path}
                    alt={movie.title} />
                    </div>

                    

                    <div className='movie-info'>
                        <h2 className='movie-title'> {movie.title}</h2>
                        <div className='movie-stats'> {"Release Date: " + movie.release_date}</div>
                        <div className='movie-stats'>{"Movie Score: " + movie.vote_average} </div>
                        <p className='movie-output'>{movie.overview}</p>
                        
                    </div>

                    <div className="similar-movie-button">
                        <button
                        className='similar-button'
                        aria-label= "Find Similar Movies"
                        aria-description= {"Click this button to find similar movies to " + movie.title}
                        onClick={() => handleSimilarMovies()}
                        >
                        Find Similar Movies! 
                        </button>
                    </div>
                    </div></div>
                </td>
                </tr>
            )
    }
    if(loading){
        return(
            <div>
                <br></br>
                <br></br>
                <br></br>
            <div className='loader'></div>
            </div>
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
