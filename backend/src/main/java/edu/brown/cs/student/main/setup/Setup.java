package edu.brown.cs.student.main.setup;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;
import edu.brown.cs.student.main.csv.FactoryFailureException;
import edu.brown.cs.student.main.csv.creators.CreateArrayList;
import edu.brown.cs.student.main.csv.creators.CreatorFromRow;
import edu.brown.cs.student.main.csv.parser.CsvParser;
import edu.brown.cs.student.main.csv.searcher.Search;
import java.io.FileReader;
import java.io.IOException;
import java.lang.reflect.Type;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.util.*;

public class Setup {

  private ArrayList<ArrayList<String>> movieList;
  private HashMap<String, String> nameMap;
  private HashMap<String, String> directors;
  private HashMap<String, String> writers;

    public Setup() throws IOException, FactoryFailureException {
        FileReader fileReader = new FileReader("backend/data/ImdbTitleBasics.csv");
        Search filterMovie = new Search(fileReader, "movie", "2", true, false);
        this.movieList = filterMovie.beginSearch();

        CreatorFromRow<ArrayList<String>> creatorFromRow = new CreateArrayList();
        fileReader = new FileReader("backend/data/ImdbName.csv");
        CsvParser<ArrayList<String>> parsedName = new CsvParser<>(fileReader, creatorFromRow);
        ArrayList<ArrayList<String>> people = parsedName.parse();
        this.nameMap = new HashMap<>();
        for (ArrayList<String> person: people) {
            this.nameMap.put(person.get(0), person.get(1));
        }

        fileReader = new FileReader("backend/data/ImdbTitleCrew.csv");
        CsvParser<ArrayList<String>> parsedCrew = new CsvParser<>(fileReader, creatorFromRow);
        ArrayList<ArrayList<String>> crew = parsedCrew.parse();
        this.directors = new HashMap<>();
        for (ArrayList<String> director: crew) {
            this.directors.put(director.get(0), director.get(1));
        }

        this.writers = new HashMap<>();
        for (ArrayList<String> writer: crew) {
            this.writers.put(writer.get(0), writer.get(2));
        }
    }
    public HashMap<String, HashMap<String, String>> setup() throws IOException, FactoryFailureException {
        FileReader fileReader = new FileReader("backend/data/ImdbTitleRatings.csv");
        CreatorFromRow<ArrayList<String>> creatorFromRow = new CreateArrayList();
        CsvParser<ArrayList<String>> parsedRatings = new CsvParser<>(fileReader, creatorFromRow);
        ArrayList<ArrayList<String>> ratings = parsedRatings.parse();
        HashMap<String, ArrayList<String>> ratingsMap = new HashMap<>();
        for (ArrayList<String> rating: ratings) {
            ratingsMap.put(rating.get(0), rating);
        }


    HashMap<String, HashMap<String, String>> movieDatabase = new HashMap<>();
    for (ArrayList<String> movie : this.movieList) {
      try {
        if (Integer.parseInt(movie.get(5)) > 1960) {
          if (ratingsMap.containsKey(movie.get(0))
              && Integer.parseInt(ratingsMap.get(movie.get(0)).get(2)) > 10000) {
            HashMap<String, String> movieData = new HashMap<>();
            movieData.put("id", movie.get(0));
            movieData.put("title", movie.get(2));
            movieData.put("release_date", movie.get(5));
            movieData.put("genre", movie.get(8));
            movieData.put("vote_average", ratingsMap.get(movie.get(0)).get(1));

            movieData.put("directors", this.directors.get(movie.get(0)));

            movieData.put("writers", this.writers.get(movie.get(0)));
            Map<String, ArrayList<Map<String, String>>> apiData =
                this.deserialize(
                    new URL(
                        "https://api.themoviedb.org/3/find/"
                            + movie.get(0)
                            + "?external_source=imdb_id&api_key=883f76f29f755de0582499a099f512a8"));
            if (apiData.get("movie_results").isEmpty()) {
              movieData.put("overview", null);
            } else {
              movieData.put("overview", apiData.get("movie_results").get(0).get("overview"));
            }
            movieData.put("poster_path", apiData.get("movie_results").get(0).get("poster_path"));
            if (!movieDatabase.containsKey(movie.get(3))) {
              movieDatabase.put(movie.get(3), movieData);
            } else {
              movieDatabase.put(movie.get(3) + " " + movie.get(5), movieData);
              System.out.println("Found duplicate");
            }
          }
        }
      } catch (NumberFormatException e) {

      }
    }
    return movieDatabase;
  }

  public HashMap<String, ArrayList<String>> setupGenre() {
    HashMap<String, ArrayList<String>> genreDatabase = new HashMap<>();
    for (ArrayList<String> movie : this.movieList) {
      String[] genres = movie.get(8).split(",");
      for (String genre : genres) {
        if (!genreDatabase.containsKey(genre)) {
          genreDatabase.put(genre, new ArrayList<>());
        }
        if (genreDatabase.get(genre).contains(movie.get(3))) {
          genreDatabase.get(genre).add(movie.get(3) + " " + movie.get(5));
        } else {
          genreDatabase.get(genre).add(movie.get(3));
        }
      }
    }
    return genreDatabase;
  }

    public HashMap<String, ArrayList<String>> setupPeopleDB() {
        HashMap<String, ArrayList<String>> peopleDatabase = new HashMap<>();
        for (ArrayList<String> movie:this.movieList) {
            for (String director: this.directors.get(movie.get(0)).split(",")) {
                if (!peopleDatabase.containsKey(director)) {
                    peopleDatabase.put(director, new ArrayList<>());
                }
                if (!peopleDatabase.get(director).contains(movie.get(3))) {
                    peopleDatabase.get(director).add(movie.get(3));
                }
            }
            for (String writer: this.writers.get(movie.get(0)).split(",")) {
                if (!peopleDatabase.containsKey(writer)) {
                    peopleDatabase.put(writer, new ArrayList<>());
                }
                if (!peopleDatabase.get(writer).contains(movie.get(3))) {
                    peopleDatabase.get(writer).add(movie.get(3));
                }
            }
        }

    return peopleDatabase;
  }

  private static HttpURLConnection connect(URL requestURL) throws IOException {
    URLConnection urlConnection = requestURL.openConnection();
    HttpURLConnection clientConnection = (HttpURLConnection) urlConnection;
    clientConnection.connect(); // GET
    return clientConnection;
  }

  private Map<String, ArrayList<Map<String, String>>> deserialize(URL requestURL)
      throws IOException {
    HttpURLConnection clientConnection = connect(requestURL);
    Moshi moshi = new Moshi.Builder().build();
    Type stringMapType = Types.newParameterizedType(Map.class, String.class, Object.class);
    Type movieList = Types.newParameterizedType(List.class, stringMapType);
    Type listType = Types.newParameterizedType(Map.class, String.class, movieList);
    JsonAdapter<Map<String, ArrayList<Map<String, String>>>> adapter = moshi.adapter(listType);
    return adapter.fromJson(
        new Scanner(clientConnection.getInputStream()).useDelimiter("\\A").next());
  }
}
