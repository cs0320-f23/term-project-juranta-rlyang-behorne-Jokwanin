package edu.brown.cs.student.main.setup;

import edu.brown.cs.student.main.csv.FactoryFailureException;
import edu.brown.cs.student.main.csv.creators.CreateArrayList;
import edu.brown.cs.student.main.csv.creators.CreatorFromRow;
import edu.brown.cs.student.main.csv.parser.CsvParser;
import edu.brown.cs.student.main.csv.searcher.Search;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;

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
            movieDatabase.put(movie.get(2), movieData);
        }
        return movieDatabase;
    }
}
