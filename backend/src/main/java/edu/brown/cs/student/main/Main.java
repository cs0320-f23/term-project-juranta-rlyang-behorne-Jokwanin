package edu.brown.cs.student.main;

import static spark.Spark.after;
import spark.Spark;

import edu.brown.cs.student.main.Handler.movieHandler;

/** A Main class that starts a server */
public class Main {

  /**
   * The main method. Starts a server and instantiates 4 endpoints: loadcsv, viewcsv, searchsv, and
   * broadband
   */
  public static void main(String[] args) {

    int port = 1234;
    Spark.port(port);

    after(
        (request, response) -> {
          response.header("Access-Control-Allow-Origin", "*");
          response.header("Access-Control-Allow-Methods", "*");
        });

    Spark.get("movieHandler", new movieHandler());
    Spark.init();
    Spark.awaitInitialization();

    System.out.println("Server started at http://localhost:" + port);
  }
}
