package edu.brown.cs.student.main.datasource;

import edu.brown.cs.student.main.csv.FactoryFailureException;
import edu.brown.cs.student.main.setup.Setup;
import edu.brown.cs.student.main.setup.Filter;
import org.junit.jupiter.api.Test;
import org.testng.Assert;


import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;

public class TestSetup {

//    @Test
//    public void testSetup() throws IOException, FactoryFailureException {
//        Setup setup = new Setup();
//        HashMap<String, HashMap<String, Object>> database = setup.setup();
//        HashMap<String, ArrayList<String>> genreDatabase = setup.setupGenre();
//        HashMap<String, ArrayList<String>> peopleDatabase = setup.setupPeopleDB();
//        Assert.assertTrue(database.containsKey("blade runner"));
//        Assert.assertTrue(genreDatabase.containsKey("drama"));
//        Assert.assertTrue(peopleDatabase.containsKey("Ridley Scott"));
//    }

    @Test
    public void testFilterGenre() throws IOException, FactoryFailureException {
        Setup setup = new Setup();
        Filter filter = new Filter();
        HashMap<String, HashMap<String, Object>> database = setup.setup();
        HashMap<String, ArrayList<String>> genreDatabase = setup.setupGenre();
        HashMap<String, ArrayList<String>> peopleDatabase = setup.setupPeopleDB();
        HashMap<String, ArrayList<String>> goodGenreMovie = filter.getGenreMovie();
        System.out.println(goodGenreMovie);
    }
}