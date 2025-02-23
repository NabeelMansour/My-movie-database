// document.addEventListener("DOMContentLoaded", renderMovieDetails);

// export async function renderMovieDetails() {
//   const movieInformation = document.getElementById("movie-information");

//   document.addEventListener("click", async (e) => {
//     const movieCard = e.target.closest(".movie-card");
//     if (!movieCard) return; // Ignore clicks outside movie cards

//     // Get the movie title from the clicked element (you can use data attributes instead)
//     const movieID = movieCard.getAttribute("data-id");
//     if (movieID) {
//       // Redirect to movie.html with movieID in the URL
//       window.location.href = `movie.html?id=${movieID}`;
//       }

//       const urlParams = new URLSearchParams(window.location.search);
//       const movieID = urlParams.get("id");

//     if (movieID) {
//       const apiKey = "fac4790c";
//       const url = `http://www.omdbapi.com/?apikey=${apiKey}&i=${encodeURIComponent(
//         movieID
//       )}`;

//       try {
//         const response = await fetch(url);
//         const movieDetails = await response.json();

//         if (movieDetails.Response === "False") {
//           movieInformation.innerHTML = `<p>Movie not found.</p>`;
//         } else {
//           window.location.href = "movie.html";
//           movieInformation.innerHTML = `
//                     <article id="movieDetailsContainer">
//                     <h1 id="movieTitle">${movieDetails.Title}</h1>
//                     <img id="moviePoster" src="${movieDetails.Poster}" alt="Movie Poster">
//                     <p id="movieYear">${movieDetails.Year}</p>
//                     <p id="moviePlot">${movieDetails.Plot}</p>
//                     </article>
//                     `;
//         }
//       } catch (error) {
//         console.error("Error fetching movie details:", error);
//       }
//     } else {
//       document.getElementById("movieDetailsContainer").innerHTML =
//         "<p>No movie ID provided.</p>";
//     }
//   });
// }

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
        <article id="movieDetailsContainer">
          <h1 id="movieTitle">${movieDetails.Title}</h1>
          <img id="moviePoster" src="${movieDetails.Poster}" alt="Movie Poster">
          <p id="movieYear">${movieDetails.Year}</p>
          <p id="moviePlot">${movieDetails.Plot}</p>
        </article>
      `;
    }
  } catch (error) {
    console.error("Error fetching movie details:", error);
  }
}

document.addEventListener("click", (e) => {
  const movieCard = e.target.closest(".movie-card");
  if (!movieCard) return; // Ignore clicks outside movie cards

  const movieID = movieCard.getAttribute("data-id");
  if (movieID) {
    // Redirect to movie.html with the movie ID in the URL
    window.location.href = `movie.html?id=${movieID}`;
  }
});
