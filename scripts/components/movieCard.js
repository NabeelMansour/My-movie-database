import {
  addFavoriteMovie,
  isFavorite,
  removeFavoriteMovie,
} from "../modules/localStorage.js";

document.addEventListener("DOMContentLoaded", renderMovieDetails);

export async function renderMovieDetails() {
  const movieInformation = document.getElementById("movie-information");

  if (!movieInformation) {
    console.error("Element #movie-information not found.");
    return;
  }

  // Extract movie ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const movieID = urlParams.get("id");

  if (!movieID) {
    movieInformation.innerHTML = "<p>No movie ID provided.</p>";
    return;
  }

  const apiKey = "fac4790c";
  const url = `http://www.omdbapi.com/?apikey=${apiKey}&i=${encodeURIComponent(
    movieID
  )}`;

  try {
    const response = await fetch(url);
    const movieDetails = await response.json();

    if (movieDetails.Response === "False") {
      movieInformation.innerHTML = "<p>Movie not found.</p>";
    } else {
      movieInformation.innerHTML = `
      <article class="movie-card detail-card" data-id="${movieDetails.imdbID}">
        <span id="card-image">
          <img src="${movieDetails.Poster}" alt="image of ${
        movieDetails.Title
      }">
          <i class="${
            isFavorite(movieDetails.imdbID) ? "fa-solid" : "fa-regular"
          } fa-star favorite-icon" data-id="${
        movieDetails.imdbID
      }" style="color: #ffd43b"></i>
        </span>
        <div class="moviePoster-content">
          <h1 id="movieTitle">${movieDetails.Title}</h1>
          <p id="movieYear">Year: ${movieDetails.Year}</p>
          <p id="moviePlot">Plot: ${movieDetails.Plot}</p>
          <p id="moviePlot">Actors: ${movieDetails.Actors}</p>
        </div>
      </article>
      `;
    }
  } catch (error) {
    console.error("Error fetching movie details:", error);
  }
}

document.addEventListener("click", (e) => {
  const star = e.target.closest(".favorite-icon");
  const movieCard = e.target.closest(".movie-card");
  const movieID = movieCard.getAttribute("data-id");

  if (star) {
    if (isFavorite(movieID)) {
      removeFavoriteMovie(movieID);
    } else {
      addFavoriteMovie(movieID);
    }

    star.classList.toggle("fa-solid");
    star.classList.toggle("fa-regular");

    return;
  }

  if (movieCard) {
    if (movieID) {
      window.location.href = `movie.html?id=${movieID}`;
    }
  }
});
