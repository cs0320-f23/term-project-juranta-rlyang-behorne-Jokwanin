package edu.brown.cs.student.main.setup;

import edu.brown.cs.student.main.csv.FactoryFailureException;
import  edu.brown.cs.student.main.setup.Setup;

import edu.brown.cs.student.main.setup.Setup;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;

public class Filter {

  private HashMap<String, String[]> movieSameGenre;

  /**
   * method name: getGenreMovie -returns the list of movies in that genre
   */
  public HashMap<String, HashMap<String, Object>> getGenreMovie()
      throws IOException, FactoryFailureException {
    // setting up the instance for the class
    // changes
    Setup setup = new Setup();
    HashMap<String, HashMap<String, Object>> movieDataBase = setup.setup();
    String allGenresMap = movieDataBase.get("genre").get(8).toString();
    String[] allGenresArray = allGenresMap.split(",");
    List<String> genreList = Arrays.asList(allGenresArray);
    HashMap<String, ArrayList<String>> genreToMovie = setup.setupGenre();
    HashMap<String, HashMap<String, Object>> movieToOtherMovieGenre = new HashMap();
    for (String genre : genreList) {
      if(genreToMovie.containsKey(genre)) {
        ArrayList<String> similarMovieGenre = genreToMovie.get(genre);
        for (String movieName : similarMovieGenre) {
          HashMap<String, Object> movieData  = new HashMap<>();
          List<String> otherMovieName = new ArrayList<>(similarMovieGenre);
          Boolean removeOneMovie = otherMovieName.remove(movieName);
          for(String movie: otherMovieName){
            movieData.put(movie, movieDataBase.get(movie));
          }
          movieToOtherMovieGenre.put(movieName, movieData);
        }
      }
    }
    return movieToOtherMovieGenre;
  }
}