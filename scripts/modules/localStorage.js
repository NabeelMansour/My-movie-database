import { fetchMovieDetails } from "./api.js";
import { getElement } from "../utils/domUtils.js";

export async function addFavoriteMovie(imdID) {
  const favorites = getFavoriteMovies();
  const movies = await fetchMovieDetails(imdID);

  favorites.push(movies);
  localStorage.setItem("favorite", JSON.stringify(favorites));
  window.location.href = "favorites.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const favorites = JSON.parse(localStorage.getItem("favorite")) || [];
  const cardContainer = getElement("#cardContainer");

  if (!cardContainer) {
    console.error("Error: #cardContainer dont exist in favorites.html");
    return;
  }

  favorites.forEach((movie) => {
    cardContainer.innerHTML += `
          <article class="movie-card" data-id="${movie.imdbID}">
          <h2>${movie.Title}</h2>
        <span id="card-image">
          <img src="${movie.Poster}" alt="image of ${movie.Title}">
          <i class="${
            isFavorite(movie.imdbID) ? "fa-solid" : "fa-regular"
          } fa-star favorite-icon" 
          data-id="${movie.imdbID}" style="color: #ffd43b"></i>
        </span>
      </article>
    `;
  });
});

export function getFavoriteMovies() {
  return JSON.parse(localStorage.getItem("favorite")) || [];
}

export function removeFavoriteMovie(id) {
  const favorites = getFavoriteMovies();
  const updatedFavorites = favorites.filter((movie) => movie.imdbID !== id);
  localStorage.setItem("favorite", JSON.stringify(updatedFavorites));

  console.log(updatedFavorites);
}

export function isFavorite(imdbid) {
  const favoriteMovies = getFavoriteMovies();
  return favoriteMovies.some((movie) => movie.imdbID === imdbid);
}
