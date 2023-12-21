package edu.brown.cs.student.main.datasource;

import edu.brown.cs.student.main.csv.FactoryFailureException;
import edu.brown.cs.student.main.csv.searcher.Search;
import edu.brown.cs.student.main.ordering.Order;
import edu.brown.cs.student.main.setup.Filter;
import edu.brown.cs.student.main.setup.Setup;
import java.io.FileNotFoundException;
import java.io.FileReader;
import org.junit.Before;
import org.junit.Test;
import org.testng.Assert;


import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;


public class TestSetup {

  private HashMap<String, HashMap<String, String>> database;
  private HashMap<String, ArrayList<String>> genreDatabase;
  private HashMap<String, ArrayList<String>> peopleDatabase;

  @Before
  public void setup() throws IOException, FactoryFailureException {
    Setup setup = new Setup();
    this.database = setup.setup();
    this.genreDatabase = setup.setupGenre();
    this.peopleDatabase = setup.setupPeopleDB();
  }

  @org.junit.Test
  public void testSetup() {
    Assert.assertTrue(database.containsKey("blade runner"));
    Assert.assertTrue(genreDatabase.containsKey("drama"));
    Assert.assertTrue(peopleDatabase.containsKey("nm0000631"));
    System.out.println(peopleDatabase.get("nm0000631"));
    System.out.println(database.get("blade runner"));
  }

  /**
   * test name: testFilterGenre()
   * - this test checks just checks how the initialization of our filtering on movie looks like
    */
  @org.junit.Test
    public void testFilterGenre() {
        Filter filter = new Filter(this.database, this.genreDatabase, this.peopleDatabase);
        HashMap<String, HashMap<String, String>> filteredList = filter.getFilteredList("blade runner");
        System.out.println(filteredList);
    }

  /**
   * test name: testOrder:
   * - this test checks the order functionality for the ranking of our movies when given a specific
   * movie
   */
  @org.junit.Test
    public void testOrder() {
        Filter filter = new Filter(this.database, this.genreDatabase, this.peopleDatabase);
        HashMap<String, HashMap<String, String>> filteredList = filter.getFilteredList("blade runner");
        Order order = new Order();
        ArrayList<HashMap<String, String>> orderedList = order.order(filteredList, this.database.get("blade runner"));
        System.out.println(orderedList);
    }


  /**
   * testGenreDatabase()
   * - this test makes sure that movies with dissimilar genres are not grouped to together
   */
  @org.junit.Test
  public void testGenreDatabase() throws IOException, FactoryFailureException {
    Setup setup = new Setup();
    // a movie whose genre is Drama
    String dramaMovie = "My Official Wife";
    System.out.println(setup.setupGenre().keySet());
    Assert.assertTrue(setup.setupGenre().get("drama").contains(dramaMovie));

  }

  /**
   * test name : testGenreDataBase2()
   * - checks that if a movie has multiple genres, the genre database would have the
   * movie as part of the values list for all genres it is applicable to
   *
   * @throws IOException
   * @throws FactoryFailureException
   */
  @org.junit.Test
  public void testGenreDatabase2() throws IOException, FactoryFailureException{
    Setup setup = new Setup();
    // genres that movie is applicable to: "Mystery, Romance, Short"
    String movieName = "The Mysterious Lodger";
    Assert.assertTrue(setup.setupGenre().get("mystery").contains(movieName));
    Assert.assertTrue(setup.setupGenre().get("romance").contains(movieName));
    Assert.assertTrue(setup.setupGenre().get("short").contains(movieName));
  }

  /**
   * test name: testSetupPeopleDB()
   * - randomly chose a director and checked if their movies were represented in the
   * peopledatabase
   * @throws IOException
   * @throws FactoryFailureException
   */
  @org.junit.Test
  public void testSetupPeopleDB() throws IOException, FactoryFailureException {
    Assert.assertTrue(peopleDatabase.get("nm0000631").contains("blade runner"));
    Assert.assertTrue(peopleDatabase.get("nm0000631").contains("conquest of paradise"));
    Assert.assertTrue(peopleDatabase.get("nm0000631").contains("black rain"));

    // checking if we have a director with all the movies that they have directed
    // ridley scott
    System.out.println(peopleDatabase.get("nm0000631"));
  }

  /**
   * test name: testSetupPeopleDB2()
   * - checks if our database for directors accounts for all directors, writers in csv data
   * @throws IOException
   * @throws FactoryFailureException
   */
  @org.junit.Test
  public void testSetupPeopleDB2() throws IOException, FactoryFailureException{
    Assert.assertEquals(this.peopleDatabase.keySet().size(), 139453);
  }

  /**
   * method name: testGenreCount
   * - checks if all the genres represented in the csv are accounted for by the
   * genredatabase
   */
  @org.junit.Test
  public void testGenreCount(){
    // https://help.imdb.com/article/contribution/titles/genres/GZDRMS6R742JRGAG#
    /* link above represents all 28 genres, and the reason why our program accounts for
    * 29 is because we have key represented as "\n" which represents movies that did not have
    * an indicated genre*/
    Assert.assertEquals(this.genreDatabase.keySet().size(),  29);
  }











}
