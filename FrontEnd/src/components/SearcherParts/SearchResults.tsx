import { useEffect } from 'react';
import { getResults } from './getResults';
import { useState } from 'react';
import '../../styles/main.css';


/**
 * interface for SearchResults props search and compare and their setters
 */
interface SearchResultsProps{
    search : String;
    setSearch :React.Dispatch<React.SetStateAction<string>>;

    compare : boolean;
    setCompare : React.Dispatch<React.SetStateAction<boolean>>;
}


/**
 * Function handles the intricacies of the the output for search
 * @param props search (string for endpoint of URL) and compare (boolean to 
 * dicated if display should show simlar movie list or search results) and 
 * setSearch (method for changing search) and setCompare 
 * (method for changing compare)
 * 
 * @returns display of table of similar movie results or display of table of 
 * search results
 */
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

      /**
       * fetches data from backend for every new search and toggles setLoading
       * boolean 
       */ 
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


    /**
     * creates table with with one table data per table row according to fetch 
    // request return data
     * @param movie 
     * @param compareTo - string representation of CSS class header to enable 
     * toggle between CSS class for table data cell
     * @returns - HTML code for table displays
     */
    function formatRow(movie : any, compareTo : string, comparing :boolean){
        return(  
                <tr>
                <td className={compareTo}>
                <div className='description-div'>
                <div className='similar-movie-container'>
                    <div className='img-and-button'> 
                    <img
                    src={"https://image.tmdb.org/t/p/original/" + movie.poster_path}
                    alt={movie.title} 
                    aria-label={'Image of the movie ' + movie.title}/>
                    </div>

                    

                    <div className='movie-info'>
                        <h2 className='movie-title' aria-label={movie.title}> {movie.title} </h2>
                        <div className='movie-stats' aria-label={"Release Date: " + movie.release_date}> {"Release Date: " + movie.release_date} </div>
                        <div className='movie-stats' aria-label={"Movie Score: " + movie.vote_average}> {"Movie Score: " + movie.vote_average} </div>
                        <p className='movie-output' aria-description={"Movie Overview: " + movie.overview}> {movie.overview} </p>
                        
                    </div>
                    {comparing ? (
                        <div></div>
                    ): (
                        <div className="similar-movie-button">
                        <button
                        className='similar-button'
                        aria-label= "Button to Find Similar Movies"
                        aria-description= {"Click this button to find similar movies to " + movie.title}
                        onClick={() => handleSimilarMovies(movie)}
                        >
                        Find Similar Movies! 
                        </button>
                    </div>
                    )}
                    
                    </div></div>
                </td>
                </tr>
            )
    }
    // Shows loading icon when loading is true/until fetch request returns a 
    // result
    if(loading){
        return(
            <div>
                <br></br>
                <br></br>
                <br></br>
            <div className='loader' aria-label='Loading Icon'
            aria-description='Image of loading Icon to signify buffering'></div>
            </div>
        )
    }
    // Shows similar movies results when "Movies Similar To: " button is pressed
    // in this case displays no results as no similarities could be found
    if(props.compare){
        if(movieResults.length === 0){
            return(
                <div>
                    <br></br>
                    <div className='header-div'>
                    <h3 className='h3-mod' aria-label='Movies Similar To:'> 
                        Movies Similar To: 
                    </h3>
                    <table className="center" 
                    aria-label='Table' 
                    aria-description='Table contains a a list of movies similar 
                    to the one you chose in decending order'>
                    <tbody>
                        {formatRow(compareMovie, "compare-cell",true)}
                        <br></br>
                        <br></br>
                        <h2 aria-label='Could not find similar movies!'>
                            Could not find similar movies!
                        </h2>
                    </tbody>
                </table>
                </div>
                </div>
            )
    // Shows similar movies results when "Movies Similar To: " button is pressed
    // in this case displays results as similarities were found
        } else {
            return(
                <div>
                    <br></br>
                    <div className='header-div'>
                    <h3 className='h3-mod' aria-label='Movies Similar To:'>
                         Movies Similar To:
                    </h3>
                    <table className="center" 
                    aria-label='Table' 
                    aria-description='Table contains a a list of movies similar 
                    to the one you chose in decending order'>
                    <tbody>
                        {formatRow(compareMovie, "compare-cell",true)}
                        <br></br>
                        <br></br>
                        {movieResults.map((eachMovie) => {
                            return formatRow(eachMovie, "scrollable-cell",false);
                        })}
                    </tbody>
                </table>
                </div>
                </div>
            )
        }
        
    // If no movies were found upon search entry then "No Results!" is displayed
    } else {
        if(movieResults.length === 0){
            return(
                <div>
                    <br></br>
                    <table className="center" >
                    <tbody>
                        <div aria-label='No Results!'>No Results!</div>
                    </tbody>
                </table>
                </div>
            )
        // Displays lists of movies that were found upon search entry
        } else {
            return(
                <div>
                    <br></br>
                    <table className="center" 
                    aria-label='Table' 
                    aria-description='Table contains a a list of movies similar 
                    to the one you chose in decending order'>
                    <tbody>
                        {movieResults.map((eachMovie) => {
                            return formatRow(eachMovie, "scrollable-cell", false);
                        })}
                    </tbody>
                </table>
                </div>
            )
            
        }
        
    }
    
}
