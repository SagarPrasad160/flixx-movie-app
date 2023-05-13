const globalState = {
  currentPath: window.location.pathname,
};

const showActiveLink = () => {
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    if (link.getAttribute("href") === globalState.currentPath) {
      link.classList.add("active");
    }
  });
};

const getPopularMovies = async () => {
  const response = await fetchData("movie/popular");
  const movies = response.results;
  movies.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
    <a href="movie-details.html?id=${movie.id}">
    ${
      movie.poster_path
        ? ` <img
    src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
    class="card-img-top"
    alt="${movie.title}"
  />`
        : ` <img
  src="images/no-image.jpg"
  class="card-img-top"
  alt="Movie Title"
/>`
    }
     
    </a>
    <div class="card-body">
      <h5 class="card-title">${movie.title}</h5>
      <p class="card-text">
        <small class="text-muted">Release Date: ${movie.release_date}</small>
      </p>
    </div>
  `;
    document.querySelector("#popular-movies").appendChild(div);
  });
};

const getPopularShows = async () => {
  const response = await fetchData("tv/popular");
  const shows = response.results;
  shows.forEach((show) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
    <a href="movie-details.html?id=${show.id}">
    ${
      show.poster_path
        ? ` <img
    src="https://image.tmdb.org/t/p/w500${show.poster_path}"
    class="card-img-top"
    alt="${show.name}"
  />`
        : ` <img
  src="images/no-image.jpg"
  class="card-img-top"
  alt="Movie Title"
/>`
    }
     
    </a>
    <div class="card-body">
      <h5 class="card-title">${show.name}</h5>
      <p class="card-text">
        <small class="text-muted">AIR Date: ${show.first_air_date}</small>
      </p>
    </div>
  `;
    document.querySelector("#popular-shows").appendChild(div);
  });
};

const fetchData = async (endpoint) => {
  const apiKey = "986a1cb8c72d2bdcd097bc7e63280665";
  const url = "https://api.themoviedb.org/3/";

  const response = await fetch(`${url}${endpoint}?api_key=${apiKey}`);
  const data = await response.json();
  return data;
};

function init() {
  switch (globalState.currentPath) {
    case "/":
    case "/index.html":
      getPopularMovies();
      break;
    case "/shows.html":
      getPopularShows();
      break;
    case "/tv-details.html":
      console.log("TV details");
      break;
    case "/movie-details.html":
      console.log("Movie details");
      break;
    case "/search.html":
      console.log("Search Page");
      break;
    default:
      break;
  }

  showActiveLink();
}

document.addEventListener("DOMContentLoaded", init);
