
export async function getResults(search :String){
    const searchURL = `http://localhost:1234/` + search;
    console.log(searchURL);
    const result = await fetch(searchURL);
    const resultJSON = await result.json();
    console.log(resultJSON);
    return resultJSON;
}