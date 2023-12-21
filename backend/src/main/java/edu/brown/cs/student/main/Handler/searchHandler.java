package edu.brown.cs.student.main.Handler;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;
import edu.brown.cs.student.main.Exceptions.DataSourceException;
import edu.brown.cs.student.main.MovieResponse.Movie;
import edu.brown.cs.student.main.MovieResponse.MovieResponse;
import java.io.IOException;
import java.lang.reflect.Type;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.util.*;
import okio.Buffer;
import spark.Request;
import spark.Response;
import spark.Route;

/**
 * Handles calls to the search endpoint to find movies that have a title similar to the movie input
 */
public class searchHandler implements Route {

  /**
   * Makes a call to an api to search for movies based on a string input
   * @param request
   * @param response
   * @return
   */
  @Override
  public Object handle(Request request, Response response) {

    Set<String> params = request.queryParams();

    int minYear =
        params.contains("minYear") ? Integer.parseInt(request.queryParams("minYear")) : 1887;
    int maxYear =
        params.contains("maxYear") ? Integer.parseInt(request.queryParams("maxYear")) : 2100;
    int minMonth =
        params.contains("minMonth") ? Integer.parseInt(request.queryParams("minMonth")) : 0;
    int maxMonth =
        params.contains("maxMonth") ? Integer.parseInt(request.queryParams("maxMonth")) : 13;
    double minScore =
        params.contains("minScore") ? Double.parseDouble(request.queryParams("minScore")) : 0;
    double maxScore =
        params.contains("maxScore") ? Double.parseDouble(request.queryParams("maxScore")) : 10;

    if(minYear > maxYear || minScore > maxScore){
      return null;
    }

    String search = request.queryParams("search");
    String[] split = search.split(" ");
    String parsedSearch = "space ed";
    for (String splitString: split) {
      if(parsedSearch == "space ed"){
        parsedSearch = splitString;
      } else {
        parsedSearch = parsedSearch + "%20" + splitString;
      }
    }

    String searchURL = "https://api.themoviedb.org/3/search/movie?" +
            "query="+ parsedSearch + "&include_adult=false&language=en-US&" +
            "api_key=883f76f29f755de0582499a099f512a8&page=1";
    System.out.println(searchURL);
    MovieResponse searchResults;

    List<Movie> results = new ArrayList<>();

    try{
      searchResults = this.deserializeMovieData(searchURL);

      for(Movie myMovie: searchResults.results){
        String [] splitDate = myMovie.release_date.split("-");


        int year;
        int month;

        try{
          year = Integer.parseInt(splitDate[0]);
          month = Integer.parseInt(splitDate[1]);
        } catch(NumberFormatException e){
          year = minYear;
          month = minMonth;
        }
        if(year <= maxYear && year >= minYear && myMovie.vote_average >= minScore
                && myMovie.vote_average <= maxScore){
          if(minYear == maxYear){
            if(month <= maxMonth && month >= minMonth){
              results.add(myMovie);
            }
          } else {
            results.add(myMovie);
          }

        }
      }

    } catch (IOException e){

    } catch (DataSourceException d){

    }




    return serialize(results);
  }

  public MovieResponse deserializeMovieData(String url) throws IOException, DataSourceException {

    // Create a URL object
    URL requestURL = new URL(url);
    HttpURLConnection connection = connect(requestURL);
    // Create a Moshi object
    Moshi moshi = new Moshi.Builder().build();
    JsonAdapter<MovieResponse> adapter = moshi.adapter(MovieResponse.class);
    MovieResponse responseObj =
        adapter.fromJson(new Buffer().readFrom(connection.getInputStream()));

    connection.disconnect();

    return responseObj;
  }

  public HttpURLConnection connect(URL requestURL) throws DataSourceException, IOException {
    URLConnection urlConnection = requestURL.openConnection();
    if (!(urlConnection instanceof HttpURLConnection)) {
      throw new DataSourceException("unexpected: result of connection wasn't HTTP");
    }
    HttpURLConnection clientConnection = (HttpURLConnection) urlConnection;
    clientConnection.connect();
    if (clientConnection.getResponseCode() != 200) {
      throw new DataSourceException(
          "unexpected: API connection not successful, status "
              + clientConnection.getResponseMessage());
    }
    return clientConnection;
  }

  private String serialize(List<Movie> results) {
    Moshi moshi = new Moshi.Builder().build();
    Type ListMovieObject =
        Types.newParameterizedType(List.class, Movie.class);
    JsonAdapter<List<Movie>> adapter = moshi.adapter(ListMovieObject);

    return adapter.toJson(results);
  }
}
