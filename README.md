# Movie Mapper

Members: juranta, rlyang, behorne, jokwnanin

Estimated Time: 50 hours

Link to repo: https://github.com/cs0320-f23/term-project-juranta-rlyang-behorne-Jokwanin.git

## Design Choices

The project is built around two server functionalities: search and recommendation. First, users can search
up the title of a movie to find a movie. They can then click on find similar movies to call recommendation
and receive a list of movies that the backend algorithm has decided as similar to the movie.

The project is split into frontend and backend directories each with their own READMEs.

## How to Run

The project can be run by first running the main method of the backend. This will start the server after 
about 5 minutes of preprocessing. Then npm start can be called in the frontend directory. Entering 
a movie title in the search bar will search for that movie and then click find similar movies to get 
recommendations.