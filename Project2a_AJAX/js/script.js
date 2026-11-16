// get DOM elements
const typeSelect = document.getElementById("typeSelect");
const movieSearch = document.getElementById("movieSearch");
const searchButton = document.getElementById("searchButton");
const movieList = document.getElementById("movieList");

// custom OMDB API key
const apiKey = "7ebde878";

// search movies function from the OMDB API
function searchMovies() {
    const searchTerm = movieSearch.value.trim();
    const type = typeSelect.value;

    // construct the API URL
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}&type=${type}`;

    // fetch from the OMDB API
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // clear previous results
            movieList.innerHTML = "";

            // check for OMDB API search errors
            if (data.Response === "False") {
                movieList.innerHTML = data.Error;
                return;
            }
            // loop through searched movies
            for (let i = 0; i < data.Search.length; i++) {
                let movie = data.Search[i];

                // display movie title, year and poster
                movieList.innerHTML += `
                    <div class="movie">
                        <img src="${movie.Poster}">
                        <div class="movie-info">
                        <p>${movie.Title}</p>
                        <p>(${movie.Year})</p>
                        </div>
                    </div>
                `;
            }
        });
    }

// search button listener
searchButton.addEventListener("click", searchMovies);

