import { fetchTopMovies } from "./modules/api.js";
import { getElement } from "./utils/domUtils.js";
import { renderTrailers } from "./modules/caroussel.js";
import { searchMovie } from "./modules/eventHandlers.js";
import { renderMovieDetails } from "./components/movieCard.js";
import { addFavoriteMovie } from "./modules/localStorage.js";

if (
  window.location.pathname === "/" ||
  window.location.pathname === "/index.html"
) {
  let movies = await fetchTopMovies();
  displayMovies(movies);

  let randomMovies = getRandomMovies(movies);
  displayRandomMovies(randomMovies);
} else if (window.location.pathname === "/favorites.html") {
  addFavoriteMovie();
} else if (window.location.pathname === "/movie.html") {
  renderMovieDetails();
} else if (window.location.pathname === "/search.html") {
  searchMovie();
}

export function displayMovies(movies) {
  let cardContainer = getElement("#cardContainer");

  if (!cardContainer) {
    console.error("Error: #cardContainer not found in the DOM!");
    return;
  }

  cardContainer.innerHTML = "";

  movies.forEach((movie) => {
    let movieCard = document.createElement("article");
    movieCard.classList.add("card");
    movieCard.dataset.id = movie.imdbID;

    movieCard.innerHTML += `
      <article class="card" data-id="${movie.imdbID}">
        <h2>${movie.Title}</h2>
        <span id="card-image">
          <img src="${movie.Poster}" alt="image of ${movie.Title}">
          <i class="fa-regular fa-star" style="color: #ffd43b" data-favorite="${movieCard.dataset.id}"></i>
        </span>
      </article>
    `;

    movieCard.addEventListener("click", () => {
      window.location.href = `movie.html?id=${movie.imdbID}`;
    });

    cardContainer.appendChild(movieCard);
  });
}

export function displayRandomMovies(randomMovies) {
  let randomCardContainer = getElement(".trailers__container");

  if (!randomCardContainer) {
    console.error("Error: #cardContainer not found in the DOM!");
    return;
  }

  randomCardContainer.innerHTML = "";

  randomMovies.forEach((movie) => {
    randomCardContainer.innerHTML += `
      <article class="random-card">
        <h2>${movie.Title}</h2>
        <img src="${movie.Poster}" alt="image of ${movie.Title}" class="image">
      </article>
    `;
  });
}

export function getRandomMovies(movies) {
  for (let i = 1; i <= 5; i++) {
    renderTrailers(movies[i], i);
  }
  return randomTrailers();
}
