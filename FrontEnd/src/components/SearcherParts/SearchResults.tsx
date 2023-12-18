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
                    alt={movie.title} 
                    aria-label={'Image of the movie ' + movie.title}/>
                    </div>

                    

                    <div className='movie-info'>
                        <h2 className='movie-title' aria-label={movie.title}> {movie.title} </h2>
                        <div className='movie-stats' aria-label={"Release Date: " + movie.release_date}> {"Release Date: " + movie.release_date} </div>
                        <div className='movie-stats' aria-label={"Movie Score: " + movie.vote_average}> {"Movie Score: " + movie.vote_average} </div>
                        <p className='movie-output' aria-aria-description={"Movie Overview: " + movie.overview}> {movie.overview} </p>
                        
                    </div>

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
            <div className='loader' aria-label='Loading Icon'
            aria-aria-description='Image of loading Icon to signify buffering'></div>
            </div>
        )
    }

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
                        {formatRow(compareMovie, "compare-cell")}
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
                        <div aria-label='No Results!'>No Results!</div>
                    </tbody>
                </table>
                </div>
            )
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
                            return formatRow(eachMovie, "scrollable-cell");
                        })}
                    </tbody>
                </table>
                </div>
            )
            
        }
        
    }
    
}
