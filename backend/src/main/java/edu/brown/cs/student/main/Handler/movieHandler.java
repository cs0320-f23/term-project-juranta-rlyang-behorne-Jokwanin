package edu.brown.cs.student.main.Handler;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;
import edu.brown.cs.student.main.csv.FactoryFailureException;
import edu.brown.cs.student.main.ordering.Order;
import edu.brown.cs.student.main.setup.Filter;
import edu.brown.cs.student.main.setup.Setup;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import spark.Request;
import spark.Response;
import spark.Route;

public class movieHandler implements Route {

  private HashMap<String, HashMap<String, String>> database;
  private HashMap<String, ArrayList<String>> genreDatabase;
  private HashMap<String, ArrayList<String>> peopleDatabase;

  public movieHandler() throws IOException, FactoryFailureException {
    Setup setup = new Setup();
    this.database = setup.setup();
    this.genreDatabase = setup.setupGenre();
    this.peopleDatabase = setup.setupPeopleDB();
  }

  @Override
  public Object handle(Request request, Response response) {

    String target = request.queryParams("target");

    Filter filter = new Filter(this.database, this.genreDatabase, this.peopleDatabase);
    HashMap<String, HashMap<String, String>> filteredDatabase = filter.getFilteredList(target);

    Order order = new Order();
    ArrayList<HashMap<String, String>> orderedList = order.order(filteredDatabase, database.get(target));

    Moshi moshi = new Moshi.Builder().build();
    Type listObject = Types.newParameterizedType(List.class, Object.class);
    JsonAdapter<List<Object>> adapter = moshi.adapter(listObject);

    ArrayList<Object> topMovies = new ArrayList<>();
    for (int i = 1; i <= 12; i++) {
      topMovies.add(orderedList.get(orderedList.size()-i));
    }
    return adapter.toJson(topMovies);
  }

  /**
   * A method that encapsulates the serialization of a JSON object. This method is used to serialize
   * the results from searching the CSV into a JSON object for the user to see.
   *
   * @param result - Whether the execution of this request was done successfully or not
   * @param data - The parsed CSV data
   * @return - A string found by serializing a Map with the above values
   */
  private String serialize(String result, List<List<String>> data) {
    Moshi moshi = new Moshi.Builder().build();
    Type mapStringObject = Types.newParameterizedType(Map.class, String.class, Object.class);
    JsonAdapter<Map<String, Object>> adapter = moshi.adapter(mapStringObject);
    Map<String, Object> responseMap = new HashMap<>();

    responseMap.put("result", result);
    responseMap.put("data", data);
    return adapter.toJson(responseMap);
  }
}
