package edu.brown.cs.student.main.datasource;

import edu.brown.cs.student.main.Exceptions.DataSourceException;
import edu.brown.cs.student.main.Handler.searchHandler;
import edu.brown.cs.student.main.MovieResponse.Movie;
import edu.brown.cs.student.main.MovieResponse.MovieResponse;
import edu.brown.cs.student.main.csv.FactoryFailureException;
import java.io.IOException;
import java.net.URL;
import org.junit.Assert;
import org.junit.Before;

public class TestSearch {
  private searchHandler searcher;

  @Before
  public void setup() throws IOException, FactoryFailureException {
    searcher = new searchHandler();
  }

  @org.junit.Test
  public void testDeSerializeThor() {
    try {
      MovieResponse response =
          this.searcher.deserializeMovieData(
              "https://api.themoviedb.org"
                  + "/3/search/movie?query=thor&include_adult=false&language=en-US&api_key=883f76f"
                  + "29f755de0582499a099f512a8&page=1");
      Movie first = response.results.get(0);

      Assert.assertEquals("Thor", first.title);
      Assert.assertEquals(10195, first.id);
      Assert.assertEquals("en", first.original_language);
      Assert.assertEquals("2011-04-21", first.release_date);
      Assert.assertEquals(6.767, first.vote_average, 0.1);

      Movie fourth = response.results.get(3);

      Assert.assertEquals("Thor: Ragnarok", fourth.title);
      Assert.assertEquals(284053, fourth.id);
      Assert.assertEquals("en", fourth.original_language);
      Assert.assertEquals("2017-10-02", fourth.release_date);
      Assert.assertEquals(7.595, fourth.vote_average, 0.1);

    } catch (IOException e) {
      Assert.assertTrue(false);
    } catch (DataSourceException f) {
      Assert.assertTrue(false);
    }
  }

  @org.junit.Test
  public void testDeSerializeTerminator() {
    try {
      MovieResponse response =
          this.searcher.deserializeMovieData(
              "https://api.themoviedb"
                  + ".org/3/search/movie?query=terminator&include_adult=false&language=en-US"
                  + "&api_key=883f76f29f755de0582499a099f512a8&page=1");
      Movie first = response.results.get(0);

      Assert.assertEquals("Terminator Genisys", first.title);
      Assert.assertEquals(87101, first.id);
      Assert.assertEquals("en", first.original_language);
      Assert.assertEquals("2015-06-23", first.release_date);
      Assert.assertEquals(5.927, first.vote_average, 0.1);

      Movie fourth = response.results.get(5);

      Assert.assertEquals("Terminator Salvation", fourth.title);
      Assert.assertEquals(534, fourth.id);
      Assert.assertEquals("en", fourth.original_language);
      Assert.assertEquals("2009-05-20", fourth.release_date);
      Assert.assertEquals(6.048, fourth.vote_average, 0.1);

    } catch (IOException e) {
      Assert.assertTrue(false);
    } catch (DataSourceException f) {
      Assert.assertTrue(false);
    }
  }

  @org.junit.Test
  public void testConnection() {
    Assert.assertThrows(
        DataSourceException.class,
        () -> {
          URL requestURL = new URL("https://httpstat.us/204");
          this.searcher.connect(requestURL);
        });

    Assert.assertThrows(
        DataSourceException.class,
        () -> {
          URL requestURL = new URL("https://httpstat.us/400");
          this.searcher.connect(requestURL);
        });

    Assert.assertThrows(
        DataSourceException.class,
        () -> {
          URL requestURL = new URL("https://httpstat.us/404");
          this.searcher.connect(requestURL);
        });
  }

  @org.junit.Test
  public void testFilters() {

  }
}
