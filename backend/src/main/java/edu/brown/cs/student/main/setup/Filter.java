package edu.brown.cs.student.main.setup;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

/**
 * This class is responsible for filtering the database based on looking for similarities between the
 * inputted movie and the whole database
 */
public class Filter {

  private HashMap<String, HashMap<String, String>> database;
  private HashMap<String, ArrayList<String>> genreDatabase;
  private HashMap<String, ArrayList<String>> peopleDatabase;
  private HashMap<String, HashMap<String, String>> filteredList;

  /**
   * Sets up the constructor by passing in the previously formed databases done by the setup class
   * @param database
   * @param genreDatabase
   * @param peopleDatabase
   */
  public Filter(
      HashMap<String, HashMap<String, String>> database,
      HashMap<String, ArrayList<String>> genreDatabase,
      HashMap<String, ArrayList<String>> peopleDatabase) {
    this.database = database;
    this.genreDatabase = genreDatabase;
    this.peopleDatabase = peopleDatabase;
    this.filteredList = new HashMap<>();
  }

  /**
   * Returns a filtered database based on the movie title passed in as a parameter
   * @param target
   * @return returns a new hashmap that contains part of the original database
   */
  public HashMap<String, HashMap<String, String>> getFilteredList(String target) {
    this.getGenreMovie(target);
    this.filterByPerson(target);
    return this.filteredList;
  }

  /**
   * Filters the database based on movie genre. Gets the data of the inputted movie and retrieves the
   * list of movies that are in the same genre as the inputted movie
   * @param target
   */
  private void getGenreMovie(String target) {
    HashMap<String, String> targetMovie =  this.database.get(target);
    String movieGenresMap = targetMovie.get("genre");
    String[] movieGenresArray = movieGenresMap.split(",");
    List<String> genreList = Arrays.asList(movieGenresArray);
    for (String genre : genreList) {
      if (this.genreDatabase.containsKey(genre)) {
        ArrayList<String> similarMovieTitles = this.genreDatabase.get(genre);
        for (String movieName : similarMovieTitles) {
          if (!movieName.equals(target)
              && !this.filteredList.containsKey(movieName)
              && this.database.containsKey(movieName)) {
            this.filteredList.put(movieName, this.database.get(movieName));
          }
        }
      }
    }
  }

  /**
   * Filters the database based on writers and directors. Gets the data of the
   * inputted movie and retrieves the list of movies have a similar director or writer
   * and adds that movie and its data to the filtered list
   * @param target
   */
  private void filterByPerson(String target) {
    HashMap<String, String> targetMovie = this.database.get(target);
    String writers = targetMovie.get("writers");
    String directors = targetMovie.get("directors");
    String[] crew = writers.concat("," + directors).split(",");
    List<String> crewList = Arrays.asList(crew);
    for (String crewMember : crewList) {
      if (this.peopleDatabase.containsKey(crewMember)) {
        ArrayList<String> similarMovieTitles = this.peopleDatabase.get(crewMember);
        for (String movieName : similarMovieTitles) {
          if (!movieName.equals(target)
              && !this.filteredList.containsKey(movieName)
              && this.database.containsKey(movieName)) {
            this.filteredList.put(movieName, this.database.get(movieName));
          }
        }
      }
    }
  }
}
