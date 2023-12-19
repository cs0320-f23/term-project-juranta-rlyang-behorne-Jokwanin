package edu.brown.cs.student.main.ordering;

import info.debatty.java.stringsimilarity.Cosine;
import java.util.ArrayList;
import java.util.HashMap;

public class Order {

    private ArrayList<ArrayList<String>> scoreList;
    public ArrayList<HashMap<String, String>> order(HashMap<String, HashMap<String, String>> database, HashMap<String, String> target) {
        this.scoreList = new ArrayList<>();
        for (String key: database.keySet()) {
            HashMap<String, String> comparison = database.get(key);
            ArrayList<String> movieScore = new ArrayList<>();
            movieScore.add(key);
            movieScore.add(this.compare(comparison, target).toString());
            this.scoreList.add(movieScore);
        }
        ArrayList<ArrayList<String>> orderedList = this.sort(this.scoreList);
        ArrayList<HashMap<String, String>> orderedMovie = new ArrayList<>();
        for (ArrayList<String> movie: orderedList) {
            orderedMovie.add(database.get(movie.get(0)));
        }
        return orderedMovie;
    }

    public Double compare(HashMap<String, String> comparison, HashMap<String, String> target) {
        double score = 0;
        String[] targetGenres = target.get("genre").split(",");
        String[] genres = comparison.get("genre").split(",");
        for (String genre: genres) {
            for (String targetGenre: targetGenres) {
                if (genre.equals(targetGenre)) {
                    score += 0.1;
                }
            }
        }
        if (comparison.get("directors").equals(target.get("directors"))) {
            score += 0.1;
        }
        String[] targetWriters = target.get("writers").split(",");
        String[] writers = comparison.get("writers").split(",");
        for (String writer: writers) {
            for (String targetWriter: targetWriters) {
                if (writer.equals(targetWriter)) {
                    score += 0.03;
                }
            }
        }
        if (Integer.parseInt(comparison.get("release_date")) == Integer.parseInt(target.get("release_date"))) {
            score += 0.1;
        } else {
            double difference = Integer.parseInt(target.get("release_date")) - Integer.parseInt(comparison.get("release_date"));
            if (difference > 0) {
                difference *= -1;
            }
            score += 0.1/difference;
        }
        Cosine cosine = new Cosine();
        if (comparison.get("overview") != null && target.get("overview") != null) {
            score += cosine.similarity(comparison.get("overview"), target.get("overview"));
        }
        return score;
    }

    private ArrayList<ArrayList<String>> sort(ArrayList<ArrayList<String>> list) {
        if (list.size() <= 1) {
            return list;
        }

        ArrayList<ArrayList<String>> left, right;
        left = new ArrayList<>();
        right = new ArrayList<>();

        for (int i = 0; i < list.size(); i++) {
            if (i % 2 != 0) left.add(list.get(i));
            else right.add(list.get(i));
        }

        left = sort(left);
        right = sort(right);

        return merge(left, right);
    }

    private ArrayList<ArrayList<String>> merge(ArrayList<ArrayList<String>> left, ArrayList<ArrayList<String>> right) {
        ArrayList<ArrayList<String>> ret = new ArrayList<>();

        while(!left.isEmpty() && !right.isEmpty()) {
            if (Double.parseDouble(left.get(0).get(1)) <= Double.parseDouble(right.get(0).get(1))) {
                ret.add(left.get(0));
                left.remove(0);
            } else {
                ret.add(right.get(0));
                right.remove(0);
            }
        }

        while (!left.isEmpty()) {
            ret.add(left.get(0));
            left.remove(0);
        }

        while (!right.isEmpty()) {
            ret.add(right.get(0));
            right.remove(0);
        }

        return ret;
    }
}
