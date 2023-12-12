public class Server {

  /**
   * The main method. Starts a server and instantiates 4 endpoints: loadcsv, viewcsv, searchsv, and
   * broadband
   */
  public static void main(String[] args) {

    BroadbandDatasource datasource = new AcsDataSource();
    ParsedCsv parsedCsv = new ParsedCsv();

    int port = 1234;
    Spark.port(port);

    after(
        (request, response) -> {
          response.header("Access-Control-Allow-Origin", "*");
          response.header("Access-Control-Allow-Methods", "*");
        });

    Spark.get("loadcsv", new LoadCsvHandler(parsedCsv));
    Spark.get("viewcsv", new ViewCsvHandler(parsedCsv));
    Spark.get("searchcsv", new SearchCsvHandler(parsedCsv));
    Spark.get("broadband", new BroadBandHandler(datasource));
    Spark.init();
    Spark.awaitInitialization();

    System.out.println("Server started at http://localhost:" + port);
  }

}
