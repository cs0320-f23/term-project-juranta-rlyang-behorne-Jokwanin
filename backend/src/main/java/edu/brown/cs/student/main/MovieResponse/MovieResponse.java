package edu.brown.cs.student.main.MovieResponse;

import java.util.List;
import java.util.Map;

public class MovieResponse {
    public final int page;
    public final List<Movie> results;

    MovieResponse(int page, List<Movie> results) {
        this.page = page;
        this.results = results;
    }
}
