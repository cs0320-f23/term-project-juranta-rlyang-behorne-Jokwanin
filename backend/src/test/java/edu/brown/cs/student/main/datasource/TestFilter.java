package edu.brown.cs.student.main.datasource;

import edu.brown.cs.student.main.csv.FactoryFailureException;
import edu.brown.cs.student.main.ordering.Order;
import edu.brown.cs.student.main.setup.Filter;
import edu.brown.cs.student.main.setup.Setup;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

public class TestFilter {

  private HashMap<String, ArrayList<String>> genreDatabase;
  private HashMap<String, ArrayList<String>> peopleDatabase;
  private HashMap<String, HashMap<String, String>> testDatabase;

  @Before
  public void setup() throws IOException, FactoryFailureException {
    Setup setup = new Setup();
    this.genreDatabase = setup.setupGenre();
    this.peopleDatabase = setup.setupPeopleDB();
    this.testDatabase = new HashMap<>();
    HashMap<String, String> bladeRunner = new HashMap<>();
    bladeRunner.put("title", "blade runner");
    bladeRunner.put("genre", "action,sci-fi,thriller");
    bladeRunner.put("directors", "nm0000631");
    bladeRunner.put("writers", "nm0266684,nm0672459,nm0001140");
    bladeRunner.put("year", "1982");
    testDatabase.put("blade runner", bladeRunner);
    HashMap<String, String> alien = new HashMap<>();
    alien.put("title", "alien");
    alien.put("genre", "horror,sci-fi");
    alien.put("directors", "nm0000631");
    alien.put("writers", "nm0639321,nm0795953");
    alien.put("year", "1979");
    testDatabase.put("alien", alien);
    HashMap<String, String> starWars = new HashMap<>();
    starWars.put("title", "star wars: episode iv - a new hope");
    starWars.put("genre", "action,adventure,fantasy");
    starWars.put("directors", "nm0000184");
    starWars.put("writers", "nm0000184");
    starWars.put("year", "1977");
    testDatabase.put("star wars: episode iv - a new hope", starWars);
    HashMap<String, String> hitch = new HashMap<>();
    hitch.put("title", "hitch");
    hitch.put("genre", "Comedy,Romance");
    hitch.put("directors", "nm0855035");
    hitch.put("writers", "nm1358355");
    hitch.put("year", "2005");
    testDatabase.put("hitch", hitch);
  }

  @Test
  public void smallTest() {
    Filter filter = new Filter(this.testDatabase, this.genreDatabase, this.peopleDatabase);
    HashMap<String, HashMap<String, String>> filteredList = filter.getFilteredList("blade runner");
    Assert.assertTrue(!filteredList.containsKey("hitch"));
    System.out.println(filteredList);
    Order order = new Order();
    ArrayList<HashMap<String, String>> orderedList =
        order.order(filteredList, this.testDatabase.get("blade runner"));
    Assert.assertTrue(orderedList.get(1).get("title").equals("alien"));
    System.out.println(orderedList);
  }
}
