const apiUrl = "https://santosnr6.github.io/Data/favoritemovies.json";

export async function fetchTopMovies() {
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let movies = await response.json();
    return movies;
  } catch (error) {
    console.error("Fel vid hämtning av filmdata", error);
    return [];
  }
}
