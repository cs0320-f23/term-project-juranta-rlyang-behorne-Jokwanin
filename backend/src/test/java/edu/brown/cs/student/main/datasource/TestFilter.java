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
import org.junit.jupiter.api.BeforeAll;

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
        HashMap<String, String> alien = new HashMap<>();
        alien.put("title", "alien");
        alien.put("genre", "horror,sci-fi");
        alien.put("directors", "nm0000631");
        alien.put("writers", "nm0639321,nm0795953");
        alien.put("release_date", "1979");
        alien.put("overview", "a");
        testDatabase.put("alien", alien);
        HashMap<String, String> starWars = new HashMap<>();
        starWars.put("title", "star wars: episode iv - a new hope");
        starWars.put("genre", "action,adventure,fantasy");
        starWars.put("directors", "nm0000184");
        starWars.put("writers", "nm0000184");
        starWars.put("release_date", "1977");
        starWars.put("overview", "b");
        testDatabase.put("star wars", starWars);
        HashMap<String, String> hitch = new HashMap<>();
        hitch.put("title", "hitch");
        hitch.put("genre", "Comedy,Romance");
        hitch.put("directors", "nm0855035");
        hitch.put("writers", "nm1358355");
        hitch.put("release_date", "2005");
        hitch.put("overview", "c");
        testDatabase.put("hitch", hitch);
        HashMap<String, String> thelma = new HashMap<>();
        thelma.put("title", "thelma & louise");
        thelma.put("genre", "adventure,crime,drama");
        thelma.put("directors", "nm0000631");
        thelma.put("writers", "nm0451884");
        thelma.put("release_date", "1991");
        thelma.put("overview", "d");
        testDatabase.put("thelma & louise", thelma);
        HashMap<String, String> bladeRunner = new HashMap<>();
        bladeRunner.put("title", "blade runner");
        bladeRunner.put("genre", "action,sci-fi,thriller");
        bladeRunner.put("directors", "nm0000631");
        bladeRunner.put("writers", "nm0266684,nm0672459,nm0001140");
        bladeRunner.put("release_date", "1982");
        bladeRunner.put("overview", "e");
        testDatabase.put("blade runner", bladeRunner);
    }

    @Test
    public void smallTestFilter() {
        Filter filter = new Filter(this.testDatabase, this.genreDatabase, this.peopleDatabase);
        HashMap<String, HashMap<String, String>> filteredList = filter.getFilteredList("blade runner");
        Assert.assertTrue(!filteredList.containsKey("hitch"));
        Assert.assertTrue(!filteredList.containsKey("blade runner"));
        Assert.assertTrue(filteredList.containsKey("thelma & louise"));
        Assert.assertTrue(filteredList.containsKey("star wars"));
        Assert.assertTrue(filteredList.containsKey("alien"));
        System.out.println(filteredList);
    }

    @Test
    public void smallTestOrder() {
        Filter filter = new Filter(this.testDatabase, this.genreDatabase, this.peopleDatabase);
        HashMap<String, HashMap<String, String>> filteredList = filter.getFilteredList("blade runner");
        Order order = new Order();
        ArrayList<HashMap<String, String>> orderedList = order.order(filteredList, this.testDatabase.get("blade runner"));
        System.out.println(orderedList);
        Assert.assertTrue(orderedList.get(2).get("title").equals("alien"));
    }

    @Test
    public void invalidMovie() throws IOException, FactoryFailureException {
        String notMovie = "fasldf";
        Filter filter = new Filter(this.testDatabase, this.genreDatabase, this.peopleDatabase);
        Assert.assertNull(this.testDatabase.get(notMovie));
    }
}
