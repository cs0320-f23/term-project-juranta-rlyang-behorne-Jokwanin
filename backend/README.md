## Movie Mapper Backend

Features
- generate movie recommendations based on a movie title
- search for movies based on a provided string

Endpoints
- recommendation `/recommendation?title=value&year=value`
  - The year is an optional parameter as there are movies that don't have remakes and can thus just be found with their titles
- search `/search?search=value`
  - There are also optional parameters for min and max year, month, and rating score

## Design Decisions and Class Overview
- The recommendation endpoint utilizes several classes. First, it uses the csv parser from earlier sprints to csvs of 
  movie data. This data is used to create several hashmaps in the setup class to be used by the filter and order 
  classes. Filter creates a hashmap which have some shared data with the input movie and Order reorders
  this hashmap into a list of the least to most similar movies.
- The search endpoint does its processing in its handler. It makes a call to an outside endpoint and 
  returns its data.

## Errors/Bugs
There is one error with running the test suite. The test suite can't run when the file paths are from the 
repository root which is what is needed for the main method to run.

## Tests
Testing is done through tests with a mocked database and tests that query the server. TestFilter creates
a short, 5 movie version of the database. Doing this, we can check if the filter is properly excluding the 
input, and filtering by genre and by cast member. Furthermore, we can check the order of the movies
when calling order and make sure that the correct movie is at the top. TestServer tests the recommendation endpoint.
It checks if the server is properly providing errors if no title is provided, if a movie title that doesn't exist is provided,
and if a movie is provided with the wrong year. Furthermore, it checks if success responses are provided if a proper
title is passed in. TestSearch tests the capabilities of the search handler. It asserts that it is properly deserializing 
data from the api and serializing it back to the frontend.

## How to Run
The server can be run from the main method of the Main class. The server takes about 5 minutes of preprocessing to start
but there are no long delays once the server starts.
