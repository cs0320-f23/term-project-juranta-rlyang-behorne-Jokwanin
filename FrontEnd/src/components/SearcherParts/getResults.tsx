
/**
 
 * @param search - string for endpoint of URL
 * @returns makes fetch request to backend to get movie data and returns json 
 * with results for the movie search
 */
export async function getResults(search :String){
    const searchURL = `http://localhost:1234/` + search;
    console.log(searchURL);
    const result = await fetch(searchURL);
    const resultJSON = await result.json();
    console.log(resultJSON);
    return resultJSON;
}