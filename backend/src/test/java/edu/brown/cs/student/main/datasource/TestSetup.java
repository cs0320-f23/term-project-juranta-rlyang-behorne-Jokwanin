package edu.brown.cs.student.main.datasource;

import edu.brown.cs.student.main.csv.FactoryFailureException;
import edu.brown.cs.student.main.ordering.Order;
import edu.brown.cs.student.main.setup.Filter;
import edu.brown.cs.student.main.setup.Setup;
import org.junit.Before;
import org.junit.Test;
import org.testng.Assert;


import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import org.junit.Before;
import org.testng.Assert;

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

    @org.junit.Test
    public void testFilterGenre() {
        Filter filter = new Filter(this.database, this.genreDatabase, this.peopleDatabase);
        HashMap<String, HashMap<String, String>> filteredList = filter.getFilteredList("blade runner");
        System.out.println(filteredList);
    }

    @Test
    public void testOrder() {
        Filter filter = new Filter(this.database, this.genreDatabase, this.peopleDatabase);
        HashMap<String, HashMap<String, String>> filteredList = filter.getFilteredList("blade runner");
        Order order = new Order();
        ArrayList<HashMap<String, String>> orderedList = order.order(filteredList, this.database.get("blade runner"));
        System.out.println(orderedList);
    }
}
