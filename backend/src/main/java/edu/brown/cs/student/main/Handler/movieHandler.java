package edu.brown.cs.student.main.Handler;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import edu.brown.cs.student.main.csv.FactoryFailureException;
import edu.brown.cs.student.main.setup.Setup;
import spark.Request;
import spark.Response;
import spark.Route;

public class movieHandler implements Route{

  private HashMap<String, HashMap<String, Object>> database;
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
    /*List<List<String>> parsedData = this.parsedData.getData();
    if (parsedData == null) {
      return this.serialize("error_datasource", new ArrayList<>());
    }
    return this.serialize("success", parsedData);*/
    return null;
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
