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
  public HashMap<String, ArrayList<String>> getGenreMovie()
      throws IOException, FactoryFailureException {
    // setting up the instance for the class
    Setup setup = new Setup();
    HashMap<String, HashMap<String, Object>> movieDataBase = setup.setup();
    String allGenresMap = movieDataBase.get("genre").get(8).toString();
    String[] allGenresArray = allGenresMap.split(",");
    System.out.println(allGenresArray);
    List<String> genreList = Arrays.asList(allGenresArray);
    HashMap<String, ArrayList<String>> genreToMovie = setup.setupGenre();
    HashMap<String, ArrayList<String>> MovietoOtherMovieGenre = new HashMap<>();
    for (String genre : genreList) {
      if (genreToMovie.containsKey(genre)) {
        ArrayList<String> similarMovieGenre = genreToMovie.get(genre);
        HashSet<String> similarMovieGenreSet = new HashSet<>(similarMovieGenre);
        for (String movieName : similarMovieGenre) {
          if (!MovietoOtherMovieGenre.containsKey(movieName)) {
            Boolean removeCurrMovie = similarMovieGenreSet.remove(movieName);
            MovietoOtherMovieGenre.put(movieName, new ArrayList<String>(similarMovieGenreSet));
          } else {
            Boolean removeCurrMovie = similarMovieGenreSet.remove(movieName);
            Boolean listMultipleGenres = MovietoOtherMovieGenre.get(movieName)
                .addAll(new ArrayList<String>(similarMovieGenreSet));
            MovietoOtherMovieGenre.put(movieName, MovietoOtherMovieGenre.get(movieName));
          }
        }
      }
    }
    return MovietoOtherMovieGenre;
  }
}

  // some issue that could arise could be duplicates



