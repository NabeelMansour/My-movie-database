document.addEventListener("DOMContentLoaded", searchMovie);
import { renderMovieDetails } from "../components/movieCard.js";

document
  .getElementById("searchForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const searchInput = document.getElementById("searchInput").value.trim();
    if (!searchInput) {
      alert("Please enter a movie name!");
      return;
    }

    // Redirect to search.html with search query in URL
    window.location.href = `/search.html?query=${searchInput}`;
  });

export async function searchMovie(event) {
  event.preventDefault();

  const apiKey = "fac4790c"; // Ensure API key is a string

  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get("query");

  const movieContainer = document.getElementById("cardContainer");

  if (!searchQuery) {
    document.getElementById("cardContainer").innerHTML =
      "<p>No search term found.</p>";
    return;
  }

  const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(
    searchQuery
  )}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === "False") {
      movieContainer.innerHTML = `<p>Movie not found.</p>`;
    } else {
      movieContainer.innerHTML = data.Search.map(
        (movie) => `
          <div class="movie-card" data-id="${movie.imdbID}">
            <h3>${movie.Title} (${movie.Year})</h3>
            <img src="${
              movie.Poster !== "N/A" ? movie.Poster : "placeholder.jpg"
            }" alt="${movie.Title}">
          </div>
        `
      ).join("");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
