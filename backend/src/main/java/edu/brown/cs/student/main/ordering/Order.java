package edu.brown.cs.student.main.ordering;

import info.debatty.java.stringsimilarity.Cosine;

import java.util.ArrayList;
import java.util.HashMap;


public class Order {

    public ArrayList<ArrayList<String>> order(HashMap<String, HashMap<String, Object>> database, HashMap<String, Object> target) {
        ArrayList<ArrayList<String>> scoreList = new ArrayList<>();
        for (String key: database.keySet()) {
            HashMap<String, Object> comparison = database.get(key);
            ArrayList<String> movieScore = new ArrayList<>();
            movieScore.add(key);
            movieScore.add(this.compare(comparison, target).toString());
            scoreList.add(movieScore);
        }
        this.sort(scoreList, 0, database.size());
        return scoreList;
    }

    public Double compare(HashMap<String, Object> comparison, HashMap<String, Object> target) {
        double score = 0;
        String[] targetGenres = target.get("genre").toString().split(",");
        String[] genres = comparison.get("genre").toString().split(",");
        for (String genre: genres) {
            for (String targetGenre: targetGenres) {
                if (genre.equals(targetGenre)) {
                    score += 0.1;
                }
            }
        }
        if (comparison.get("director").equals(target.get("director"))) {
            score += 0.1;
        }
        if (comparison.get("writer").equals(target.get("writer"))) {
            score += 0.1;
        }
        if (Integer.parseInt(comparison.get("year").toString()) == Integer.parseInt(comparison.get("year").toString())) {
            score += 0.1;
        } else {
            double difference = Integer.parseInt(comparison.get("year").toString()) - Integer.parseInt(comparison.get("year").toString());
            if (difference > 0) {
                difference *= -1;
            }
            score += 0.1/difference;
        }
        Cosine cosine = new Cosine();
        score = cosine.similarity(comparison.get("overview").toString(), target.get("overview").toString());
        return score;
    }

    private void sort(ArrayList<ArrayList<String>> scoreList, int start, int end) {
        if (start < end) {
            int middle = (start + end-1)/2;
            sort(scoreList, start, middle);
            sort(scoreList, middle+1, end);

            this.merge(scoreList, start, middle, end);
        }
    }

    private void merge(ArrayList<ArrayList<String>> scoreList, int start, int middle, int end) {
        int length1 = middle-start+1;
        int length2 = end-middle;

        ArrayList<ArrayList<String>> left = new ArrayList<>(length1);
        ArrayList<ArrayList<String>> right = new ArrayList<>(length2);

        for (int i = 0; i < length1; i++) {
            left.add(i, scoreList.get(start+i));
        }
        for (int i = 0; i < length2; i++) {
            right.add(i, scoreList.get(middle+1+i));
        }

        int i = 0, j = 0;
        int k = start;
        while (i < length1 && j < length2) {
            if (Double.parseDouble(left.get(i).get(1)) <= Double.parseDouble(right.get(j).get(1))) {
                scoreList.remove(k);
                scoreList.add(k, left.get(i));
                i++;
            } else {
                scoreList.remove(k);
                scoreList.add(k, right.get(i));
                j++;
            }
            k++;
        }
    }
}
