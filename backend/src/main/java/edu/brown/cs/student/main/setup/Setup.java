package edu.brown.cs.student.main.setup;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;
import edu.brown.cs.student.main.csv.FactoryFailureException;
import edu.brown.cs.student.main.csv.creators.CreateArrayList;
import edu.brown.cs.student.main.csv.creators.CreatorFromRow;
import edu.brown.cs.student.main.csv.parser.CsvParser;
import edu.brown.cs.student.main.csv.searcher.Search;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.lang.reflect.Type;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Scanner;

public class Setup {

    private ArrayList<ArrayList<String>> movieList;
    private HashMap<String, String> nameMap;
    private HashMap<String, String[]> directors;
    private HashMap<String, String[]> writers;


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
            String[] list = director.get(1).split(",");
            for (int i = 0; i < list.length; i++) {
                list[i] = this.nameMap.get(list[i]);
            }
            this.directors.put(director.get(0), list);
        }

        this.writers = new HashMap<>();
        for (ArrayList<String> writer: crew) {
            String[] list = writer.get(1).split(",");
            for (int i = 0; i < list.length; i++) {
                list[i] = this.nameMap.get(list[i]);
            }
            this.writers.put(writer.get(0), list);
        }
    }
    public HashMap<String, HashMap<String, Object>> setup() throws IOException, FactoryFailureException {
        FileReader fileReader = new FileReader("backend/data/ImdbTitleRatings.csv");
        CreatorFromRow<ArrayList<String>> creatorFromRow = new CreateArrayList();
        CsvParser<ArrayList<String>> parsedRatings = new CsvParser<>(fileReader, creatorFromRow);
        ArrayList<ArrayList<String>> ratings = parsedRatings.parse();
        HashMap<String, String> ratingsMap = new HashMap<>();
        for (ArrayList<String> rating: ratings) {
            ratingsMap.put(rating.get(0), rating.get(1));
        }


        HashMap<String, HashMap<String, Object>> movieDatabase = new HashMap<>();
        for (ArrayList<String> movie:this.movieList) {
            HashMap<String, Object> movieData = new HashMap<>();
            movieData.put("id", movie.get(0));
            movieData.put("title", movie.get(2));
            movieData.put("year", movie.get(5));
            movieData.put("genre", movie.get(8));
            movieData.put("ratings", ratingsMap.get(movie.get(0)));
            movieData.put("directors", this.directors.get(movie.get(0)));
            movieData.put("writers", this.writers.get(movie.get(0)));
            HashMap<String, HashMap<String, String>> apiData = this.deserialize(new URL("https://api.themoviedb.org/3/find/"+movie.get(0)+"?external_source=imdb_id"));
            movieDatabase.put(movie.get(2), movieData);
        }
        return movieDatabase;
    }

    public HashMap<String, ArrayList<String>> setupGenre() {
        HashMap<String, ArrayList<String>> genreDatabase = new HashMap<>();
        for (ArrayList<String> movie:this.movieList) {
            String[] genres = movie.get(8).split(",");
            for (String genre: genres) {
                if (!genreDatabase.containsKey(genre)) {
                    genreDatabase.put(genre, new ArrayList<>());
                }
                genreDatabase.get(genre).add(movie.get(2));
            }
        }
        return genreDatabase;
    }

    public HashMap<String, ArrayList<String>> setupPeopleDB() {
        HashMap<String, ArrayList<String>> peopleDatabase = new HashMap<>();
        for (ArrayList<String> movie:this.movieList) {
            for (String director: this.directors.get(movie.get(0))) {
                if (!peopleDatabase.containsKey(director)) {
                    peopleDatabase.put(director, new ArrayList<>());
                }
                peopleDatabase.get(director).add(movie.get(2));
            }
            for (String writer: this.writers.get(movie.get(0))) {
                if (!peopleDatabase.containsKey(writer)) {
                    peopleDatabase.put(writer, new ArrayList<>());
                }
                peopleDatabase.get(writer).add(movie.get(2));
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

    private HashMap<String, HashMap<String, String>> deserialize(URL requestURL) throws  IOException {
        HttpURLConnection clientConnection = connect(requestURL);
        Moshi moshi = new Moshi.Builder().build();
        Type stringListType = Types.newParameterizedType(List.class, String.class);
        Type listType = Types.newParameterizedType(List.class, stringListType);
        JsonAdapter<HashMap<String, HashMap<String, String>>> adapter = moshi.adapter(listType);
        return adapter.fromJson(
                new Scanner(clientConnection.getInputStream()).useDelimiter("\\A").next());
    }

}
