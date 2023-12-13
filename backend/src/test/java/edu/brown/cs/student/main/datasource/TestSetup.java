package edu.brown.cs.student.main.datasource;

import edu.brown.cs.student.main.csv.FactoryFailureException;
import edu.brown.cs.student.main.setup.Setup;
import org.junit.jupiter.api.Test;
import org.testng.Assert;


import java.io.IOException;
import java.util.HashMap;

public class TestSetup {

    @Test
    public void testSetup() throws IOException, FactoryFailureException {
        Setup setup = new Setup();
        HashMap<String, HashMap<String, Object>> database = setup.setup();
        Assert.assertTrue(database.containsKey("blade runner"));
    }
}