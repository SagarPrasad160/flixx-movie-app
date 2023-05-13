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

function init() {
  switch (globalState.currentPath) {
    case "/":
    case "/index.html":
      console.log("Home");
      break;
    case "/shows.html":
      console.log("TV Shows");
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
