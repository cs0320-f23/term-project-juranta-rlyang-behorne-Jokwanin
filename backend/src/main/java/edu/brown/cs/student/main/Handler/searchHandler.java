package edu.brown.cs.student.main.Handler;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;
import edu.brown.cs.student.main.Exceptions.DataSourceException;
import edu.brown.cs.student.main.MovieResponse.MovieResponse;
import edu.brown.cs.student.main.ordering.Order;
import edu.brown.cs.student.main.setup.Filter;
import okio.Buffer;
import spark.Request;
import spark.Response;
import spark.Route;

import java.io.IOException;
import java.lang.reflect.Type;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.util.*;


public class searchHandler implements Route {
    @Override
    public Object handle(Request request, Response response) {

        Set<String> params = request.queryParams();

        double minYear = params.contains("minYear") ?
                Double.parseDouble(request.queryParams("minYear")) : 1887;
        double maxYear = params.contains("maxYear") ?
                Double.parseDouble(request.queryParams("maxYear")) : 2100;
        double minMonth = params.contains("minMonth") ?
                Double.parseDouble(request.queryParams("minMonth")) : 0;
        double maxMonth = params.contains("maxMonth") ?
                Double.parseDouble(request.queryParams("maxMonth")) : 13;
        double minScore = params.contains("minScore") ?
                Double.parseDouble(request.queryParams("minScore")) : 0;
        double maxScore = params.contains("maxScore") ?
                Double.parseDouble(request.queryParams("maxScore")) : 10;

        List<Map<String,String>> results = new ArrayList<>();



        return null;
    }

    public MovieResponse deserializeMovieData(String url)
            throws IOException, DataSourceException {

        // Create a URL object
        URL requestURL = new URL(url);
        HttpURLConnection connection = connect(requestURL);
        // Create a Moshi object
        Moshi moshi = new Moshi.Builder().build();
        JsonAdapter<MovieResponse> adapter =
                moshi.adapter(MovieResponse.class);
        MovieResponse responseObj =
                adapter.fromJson(new Buffer().readFrom(connection.getInputStream()));

        connection.disconnect();

        return responseObj;
    }
    public HttpURLConnection connect(URL requestURL) throws DataSourceException, IOException {
        URLConnection urlConnection = requestURL.openConnection();
        if (!(urlConnection instanceof HttpURLConnection)) {
            throw new DataSourceException("unexpected: result of connection wasn't HTTP");
        }
        HttpURLConnection clientConnection = (HttpURLConnection) urlConnection;
        clientConnection.connect();
        if (clientConnection.getResponseCode() != 200) {
            throw new DataSourceException(
                    "unexpected: API connection not successful, status "
                            + clientConnection.getResponseMessage());
        }
        return clientConnection;
    }

    private String serialize(List<Map<String,String>> results) {
        Moshi moshi = new Moshi.Builder().build();
        Type mapStringObject = Types.newParameterizedType(List.class, Map.class,
                String.class, String.class);
        JsonAdapter<List<Map<String, String>>> adapter = moshi.adapter(mapStringObject);

        return adapter.toJson(results);
    }
}
