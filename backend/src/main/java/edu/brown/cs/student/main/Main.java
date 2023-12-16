package edu.brown.cs.student.main;

import static spark.Spark.after;

import edu.brown.cs.student.main.csv.FactoryFailureException;
import spark.Spark;

import edu.brown.cs.student.main.Handler.movieHandler;

import java.io.IOException;

/** A Main class that starts a server */
public class Main {

  /**
   *
   */
  public static void main(String[] args) throws IOException, FactoryFailureException {

    int port = 1234;
    Spark.port(port);

    after(
        (request, response) -> {
          response.header("Access-Control-Allow-Origin", "*");
          response.header("Access-Control-Allow-Methods", "*");
        });


    Spark.get("recommendation", new movieHandler());
    Spark.init();
    Spark.awaitInitialization();

    System.out.println("Server started at http://localhost:" + port);
  }
}
