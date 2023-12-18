import { useEffect } from 'react';
import { getResults } from './getResults';
import { useState } from 'react';
import '../../styles/main.css';


interface SearchResultsProps{
    search : String;
    setSearch :React.Dispatch<React.SetStateAction<string>>;

    compare : boolean;
    setCompare : React.Dispatch<React.SetStateAction<boolean>>;
}



export function SearchResults(props: SearchResultsProps){
    const [movieResults, setMovieResults] = useState<string[]>([]);

    const [loading, setLoading] = useState<boolean>(false);
    
    
    const[compareMovie, setCompareMovie] = useState();

    function handleSimilarMovies(movie: any) {
        const date = movie.release_date.split("-");
        let movieSplit :string = ``;
        if(compareMovie){
            movieSplit = movie.title.split(" ");
        } else {
            movieSplit = movie.original_title.split(" ");
        }

        let resultTitle = '';
        let first = true;
        console.log(movieSplit);
        for(const piece of movieSplit){
            if(first){
                resultTitle = piece;
                first = false;
            } else {
                resultTitle = resultTitle + '+' + piece;
            }
            
        }
        if(date[0] === ''){
            props.setSearch(`recommendation?target=` + resultTitle + `&year=1203`);
        } else {
            props.setSearch(`recommendation?target=` + resultTitle + `&year=` + date[0]);
        }
        
        console.log(props.search);
        props.setCompare(true);
        setCompareMovie(movie);
    
      }
    useEffect(() => {
        if(props.search !== ''){
            setLoading(true);
            
            getResults(props.search).then(resultJSON => {
                setLoading(false);
                if(props.compare){
                    if(resultJSON.result === "error_datasource"){
                        setMovieResults([]);
                    } else {
                        setMovieResults(resultJSON.data);
                    }
                    
                } else {
                    setMovieResults(resultJSON);
                }
                
            }); 
                
        
        }
    }, [props.search]);

    function formatRow(movie : any, compareTo : string){
        return(  
                <tr>
                <td className={compareTo}>
                <div className='description-div'>
                <div className='similar-movie-container'>
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
                        onClick={() => handleSimilarMovies(movie)}
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

    if(props.compare){
        if(movieResults.length === 0){
            return(
                <div>
                    <br></br>
                    <div className='header-div'>
                    <h3 className='h3-mod'> Movies Similar To: </h3>
                    <table className="center" >
                    <tbody>
                        {formatRow(compareMovie, "compare-cell")}
                        <br></br>
                        <br></br>
                        <h2>Could not find similar movies!</h2>
                    </tbody>
                </table>
                </div>
                </div>
            )
        } else {
            return(
                <div>
                    <br></br>
                    <div className='header-div'>
                    <h3 className='h3-mod'> Movies Similar To: </h3>
                    <table className="center" >
                    <tbody>
                        {formatRow(compareMovie, "compare-cell")}
                        <br></br>
                        <br></br>
                        {movieResults.map((eachMovie) => {
                            return formatRow(eachMovie, "scrollable-cell");
                        })}
                    </tbody>
                </table>
                </div>
                </div>
            )
        }
        
    } else {
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
                            return formatRow(eachMovie, "scrollable-cell");
                        })}
                    </tbody>
                </table>
                </div>
            )
            
        }
        
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
