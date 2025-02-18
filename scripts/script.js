import { fetchTopMovies } from "./modules/api";

if (
  window.location.pathname === "/" ||
  window.location.pathname === "/index.html"
) {
  console.log("index.html");
  let movies = await fetchTopMovies();
  displayMovies(movies);
} else if (window.location.pathname === "/favorites.html") {
  console.log("favorites.html");
} else if (window.location.pathname === "/movie.html") {
  console.log("movie.html");
} else if (window.location.pathname === "/search.html") {
  console.log("search.html");
}
