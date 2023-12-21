 Here are some things we require you to write in the README:
 Movie Mapper:
    - Interface that allows ones to enter a movie and returns a list of the 
    possible movies you were searching for. For each item in the list you are 
    given an option to find similar movie to the one you chose so that the user 
    can get movie recommendations. 


Team Members:
Jason Uranta (juranta)
    Worked on Frontend: worked on designing the outlook for the website and 
    core part of layout and worked on CSS and some functionality
Ryan Yang (rlyang)
    Worked on Frontend: implepented a lot of functionality for frontend and also
     worked on frontend aesthetics


Total estimated time it took to complete project:
    26 hours


A link to your repo: 
    https://github.com/cs0320-f23/term-project-juranta-rlyang-behorne-Jokwanin


Design choices 
    Main idea was to make website to resemble a section of Netflix's mobile "New & Hot"
    section where items are scrolled through one at a time with a description of
    movie. Color scheme was made to look simple and sleek. Filters were added to 
    enhance user experience when searching for desired movie. 


Relationships between classes/interfaces:
    index.tsx is the parent class for the App.tsx class which is the 
    parent class for Searcher.tsx which the parent class for MovieInput.tsx and 
    SearchResults.tsx. MovieInput is the parent class for ControlledInput.tsx and
    Filters.tsx. SearchResults.tsx is the parent class for the getResults method.


Tests: 
    Main tests are in e2e folder. 
    Main tests are integration testing with Playwright that test frontend components
    that are dependent on backend are working
    Can run tests by running suite or files.


How to run program:
    Can build and run program using 'npm start'.

