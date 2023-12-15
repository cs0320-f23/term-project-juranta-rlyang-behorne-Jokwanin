package edu.brown.cs.student.main.setup;

import edu.brown.cs.student.main.csv.FactoryFailureException;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

public class Filter {

  private HashMap<String, HashMap<String, String>> database;
  private HashMap<String, ArrayList<String>> genreDatabase;
  private HashMap<String, ArrayList<String>> peopleDatabase;
  private HashMap<String, HashMap<String, String>> filteredList;

  public Filter(HashMap<String, HashMap<String, String>> database,
                HashMap<String, ArrayList<String>> genreDatabase, HashMap<String, ArrayList<String>> peopleDatabase ) {
    this.database = database;
    this.genreDatabase = genreDatabase;
    this.peopleDatabase = peopleDatabase;
    this.filteredList = new HashMap<>();
  }

  public HashMap<String, HashMap<String, String>> getFilteredList(String target) {
    this.getGenreMovie(target);
    this.filterByPerson(target);
    return this.filteredList;
  }

  /**
   * method name: getGenreMovie -returns the list of movies in that genre
   */
  private void getGenreMovie(String target) {
    // setting up the instance for the class
    // changes

    HashMap<String, String> targetMovie =  this.database.get(target);
    String movieGenresMap = targetMovie.get("genre").toString();
    String[] movieGenresArray = movieGenresMap.split(",");
    List<String> genreList = Arrays.asList(movieGenresArray);
    for (String genre : genreList) {
      if(this.genreDatabase.containsKey(genre)) {
        ArrayList<String> similarMovieTitles = this.genreDatabase.get(genre);
        for (String movieName : similarMovieTitles) {
          if (!movieName.equals(target) && !this.filteredList.containsKey(movieName) && this.database.containsKey(movieName)) {
              this.filteredList.put(movieName, this.database.get(movieName));
          }
        }
      }
    }
  }

  private void filterByPerson(String target) {
    // setting up the instance for the class
    // changes

    HashMap<String, String> targetMovie =  this.database.get(target);
    String writers = targetMovie.get("writers");
    String directors = targetMovie.get("directors");
    String[] crew = writers.concat("," + directors).split(",");
    List<String> crewList = Arrays.asList(crew);
    for (String crewMember : crewList) {
      if(this.peopleDatabase.containsKey(crewMember)) {
        ArrayList<String> similarMovieTitles = this.peopleDatabase.get(crewMember);
        for (String movieName : similarMovieTitles) {
          if (!movieName.equals(target) && !this.filteredList.containsKey(movieName)  && this.database.containsKey(movieName)) {
            this.filteredList.put(movieName, this.database.get(movieName));
          }
        }
      }
    }
  }
}