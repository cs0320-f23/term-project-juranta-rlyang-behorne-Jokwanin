package edu.brown.cs.student.main.MovieResponse;

public class Movie {
    public final int id;
    public final String original_language;
    public final String original_title;
    public final String overview;
    public final float popularity;
    public final String poster_path;
    public final String release_date;
    public final String title;
    public final boolean video;
    public final float vote_average;
    public final int vote_count;

    Movie(int id, String original_language, String original_title, String overview, int popularity,
          String poster_path, String release_date, String title, boolean video, int vote_average, int vote_count) {
        this.id = id;
        this.original_language = original_language;
        this.original_title = original_title;
        this.overview = overview;
        this.popularity = popularity;
        this.poster_path = poster_path;
        this.release_date = release_date;
        this.title = title;
        this.video = video;
        this.vote_average = vote_average;
        this.vote_count = vote_count;
    }
}