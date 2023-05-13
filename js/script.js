/* eslint-disable no-undef */

const globalState = {
  currentPath: window.location.pathname,
  search: {
    type: "",
    term: "",
    page: 1,
    totalPages: 1,
  },
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
    <a href="tv-details.html?id=${show.id}">
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

const getMovieDetails = async () => {
  const movieId = window.location.search.split("=")[1];
  const movie = await fetchData(`movie/${movieId}`);
  const div = document.createElement("div");
  div.innerHTML = `
  <div class="details-top">
  <div>
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
  </div>
  <div>
    <h2>${movie.title}</h2>
    <p>
      <i class="fas fa-star text-primary"></i>
      ${movie.vote_average.toFixed(1)} / 10
    </p>
    <p class="text-muted">Release Date: ${movie.release_date}</p>
    <p>
      ${movie.overview}
    </p>
    <h5>Genres</h5>
    <ul class="list-group">
     ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join("")}
    </ul>
    <a href="${
      movie.homepage
    }" target="_blank" class="btn">Visit Movie Homepage</a>
  </div>
</div>
<div class="details-bottom">
  <h2>Movie Info</h2>
  <ul>
    <li><span class="text-secondary">Budget:</span> $ ${addCommasToNumber(
      movie.budget
    )}</li>
    <li><span class="text-secondary">Revenue:</span>$ ${addCommasToNumber(
      movie.revenue
    )}</li>
    <li><span class="text-secondary">Runtime:</span> ${
      movie.runtime
    } minutes</li>
    <li><span class="text-secondary">Status:</span> ${movie.status}</li>
  </ul>
  <h4>Production Companies</h4>
  <div class="list-group">${movie.production_companies
    .map((company) => `<div>${company.name}</div>`)
    .join("")}</div>
</div>
  `;

  document.querySelector("#movie-details").appendChild(div);
};

const getShowDetails = async () => {
  const showId = window.location.search.split("=")[1];
  const show = await fetchData(`tv/${showId}`);
  console.log(show);
  const div = document.createElement("div");
  div.innerHTML = `
  <div class="details-top">
  <div>
  ${
    show.poster_path
      ? ` <img
  src="https://image.tmdb.org/t/p/w500${show.poster_path}"
  class="card-img-top"
  alt="${show.title}"
/>`
      : ` <img
src="images/no-image.jpg"
class="card-img-top"
alt="Movie Title"
/>`
  }
  </div>
  <div>
    <h2>${show.name}</h2>
    <p>
      <i class="fas fa-star text-primary"></i>
      ${show.vote_average.toFixed(1)} / 10
    </p>
    <p class="text-muted">Release Date: XX/XX/XXXX</p>
    <p>
      ${show.overview}
    </p>
    <h5>Genres</h5>
    <ul class="list-group">
    ${show.genres.map((genre) => `<li>${genre.name}</li>`).join("")}
    </ul>
    <a href="${
      show.homepage
    }" target="_blank" class="btn">Visit Show Homepage</a>
  </div>
</div>
<div class="details-bottom">
  <h2>Show Info</h2>
  <ul>
    <li><span class="text-secondary">Number Of Episodes:</span>${
      show.number_of_episodes
    }</li>
    <li>
      <span class="text-secondary">Last Episode To Air:</span> 
      ${show.last_air_date}
    </li>
    <li><span class="text-secondary">Status:</span>${show.status}</li>
  </ul>
  <h4>Production Companies</h4>
  <div class="list-group">${show.production_companies
    .map((company) => `<div>${company.name}</div>`)
    .join("")}</div></div>
</div>
  `;

  document.querySelector("#show-details").appendChild(div);
};

const showSlider = async () => {
  const { results } = await fetchData("movie/now_playing");
  console.log(results);
  results.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("swiper-slide");
    div.innerHTML = `
   
    <a href="movie-details.html?id=${movie.id}">
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="Movie Title" />
    </a>
    <h4 class="swiper-rating">
      <i class="fas fa-star text-secondary"></i> ${movie.vote_average} / 10
    </h4>
 
    `;
    document.querySelector(".swiper-wrapper").appendChild(div);

    initSwipper();
  });
};

const initSwipper = () => {
  const swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    autoPlay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      700: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });
};

const searchData = async () => {
  const apiKey = "986a1cb8c72d2bdcd097bc7e63280665";
  const url = "https://api.themoviedb.org/3/";

  const response = await fetch(
    `${url}search/${globalState.search.type}?api_key=${apiKey}&query=${globalState.search.term}`
  );
  const data = await response.json();
  return data;
};

const search = async () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  globalState.search.type = urlParams.get("type");
  globalState.search.term = urlParams.get("search-term");

  if (globalState.search.term !== "" && globalState.search.term !== null) {
    // search the results
    const { results } = await searchData();
    console.log(results);
    if (results.length === 0) {
      alert("No Search Results Found");
    } else {
      results.map((result) => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `
        <a href="${globalState.search.type}-details.html?id=${result.id}">
        ${
          result.poster_path
            ? ` <img
        src="https://image.tmdb.org/t/p/w500${result.poster_path}"
        class="card-img-top"
        alt="_ Title"
      />`
            : ` <img
      src="images/no-image.jpg"
      class="card-img-top"
      alt="Movie Title"
    />`
        }
         
        </a>
        <div class="card-body">
          <h5 class="card-title">${
            globalState.search.type === "movie" ? result.title : result.name
          }</h5>
          <p class="card-text">
            <small class="text-muted">Release Date: ${
              globalState.search.type === "movie"
                ? result.release_date
                : result.first_air_date
            }</small>
          </p>
        </div>
            `;
        document.querySelector("#search-results").appendChild(div);
      });
    }
  } else {
    alert("Please enter a search term!");
  }
};

const addCommasToNumber = (number) => {
  // Convert the number to a string
  let numberStr = number.toString();

  // Use a regular expression to add commas after every three digits
  numberStr = numberStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Return the updated string as a number
  return numberStr;
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
      showSlider();
      getPopularMovies();
      break;
    case "/shows.html":
      getPopularShows();
      break;
    case "/tv-details.html":
      getShowDetails();
      break;
    case "/movie-details.html":
      getMovieDetails();
      break;
    case "/search.html":
      search();
      break;
    default:
      break;
  }

  showActiveLink();
}

document.addEventListener("DOMContentLoaded", init);
