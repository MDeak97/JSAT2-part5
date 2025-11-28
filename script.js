// File: script.js
// Description: File to answer questions from Part 5 of assessment JSAT 2
// Author: Michael Deak
// Date: 28/11/2025
// Version: 1.1.0

// Classes and Movie Data

class Movie {
  constructor(id, title, year, rating) {
    this.id = Number(id);
    this.title = title;
    this.year = year;
    this.rating = Number(rating);
  }
}

class MovieList {
  constructor() {
    this.originalMovies = [
      new Movie(5, "Inception", 2010, 5),
      new Movie(1, "Matrix", 2010, 4),
      new Movie(8, "Interstellar", 2014, 5),
      new Movie(3, "Avatar", 2009, 4),
      new Movie(10, "Gladiator", 2000, 5),
      new Movie(7, "Titanic", 1997, 4),
      new Movie(2, "The Dark Knight", 2008, 5),
      new Movie(9, "Joker", 2019, 4),
      new Movie(4, "The Lion King", 1994, 5),
      new Movie(6, "Avengers: Endgame", 2019, 5),
    ];
    this.movies = this.originalMovies.map(
      (m) => new Movie(m.id, m.title, m.year, m.rating)
    );
  }

  add(movie) {
    this.movies.push(movie);
  }
  restoreOriginal() {
    this.movies = this.originalMovies.map(
      (m) => new Movie(m.id, m.title, m.year, m.rating)
    );
  }
  sortAZ() {
    this.movies.sort((a, b) => a.title.localeCompare(b.title));
  }
  sortZA() {
    this.movies.sort((a, b) => b.title.localeCompare(a.title));
  }
  sortBest() {
    this.movies.sort((a, b) => b.rating - a.rating);
  }
  findById(id) {
    return this.movies.find((m) => m.id == id);
  }
  findByTitle(text) {
    return this.movies.filter((m) =>
      m.title.toLowerCase().includes(text.toLowerCase())
    );
  }
}

const movieList = new MovieList();

// Add movie function

function addMovie() {
  const idInput = document.getElementById("movieId");
  const titleInput = document.getElementById("movieTitle");
  const yearInput = document.getElementById("movieYear");
  const ratingInput = document.getElementById("movieRating");

  const id = parseInt(idInput.value);
  const title = titleInput.value.trim();
  const year = parseInt(yearInput.value);
  const rating = parseInt(ratingInput.value);

  if (!id || id <= 0) {
    alert("Movie ID must be positive.");
    return;
  }
  if (!title) {
    alert("Title cannot be empty.");
    return;
  }
  if (!year || year < 0) {
    alert("Invalid year.");
    return;
  }
  if (movieList.movies.some((m) => m.id === id)) {
    alert("ID already exists.");
    return;
  }

  movieList.add(new Movie(id, title, year, rating));
  displayList();

  // Clear inputs
  idInput.value = "";
  titleInput.value = "";
  yearInput.value = "";
  ratingInput.value = "";

  alert("Movie added successfully!");
}

// Update Movie Raiting

function updateMovieRating(movieId, newRating) {
  const movie = movieList.findById(movieId);
  if (movie) {
    movie.rating = newRating;
    displayList();
  }
}

// Star Builder

function buildStarDisplay(rating, movieId) {
  const container = document.createElement("span");

  for (let i = 1; i <= 5; i++) {
    const star = document.createElement("span");
    star.textContent = i <= rating ? "⭐" : "☆";
    star.classList.add("star");

    // Make stars clickable
    star.addEventListener("click", () => {
      updateMovieRating(movieId, i);
    });

    container.appendChild(star);
  }

  return container;
}

// Tab Functionality

function openTab(evt, tabName) {
  const tabcontents = document.getElementsByClassName("tabcontent");
  for (let i = 0; i < tabcontents.length; i++)
    tabcontents[i].style.display = "none";

  const tablinks = document.getElementsByClassName("tablink");
  for (let i = 0; i < tablinks.length; i++)
    tablinks[i].classList.remove("active");

  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.classList.add("active");
}

// Default on page load

window.addEventListener("DOMContentLoaded", () => {
  displayList(movieList.movies);
  document.getElementById("AddMovie").style.display = "block";
});

// Display movie function

function displayList() {
  const listBox = document.getElementById("movieList");
  while (listBox.firstChild) listBox.removeChild(listBox.firstChild);

  movieList.movies.forEach((movie) => {
    const p = document.createElement("p");
    const text = document.createElement("span");
    text.textContent = `ID: ${movie.id} - ${movie.title} (${movie.year}) - `;
    const stars = buildStarDisplay(movie.rating, movie.id); // clickable
    p.appendChild(text);
    p.appendChild(stars);
    listBox.appendChild(p);
  });
}

// Search Movie by Id Function

function searchById() {
  const idInput = document.getElementById("searchId");
  const searchId = parseInt(idInput.value);
  if (!searchId || searchId <= 0) {
    alert("Enter valid ID.");
    return;
  }

  const result = movieList.findById(searchId);
  const listBox = document.getElementById("movieList");
  while (listBox.firstChild) listBox.removeChild(listBox.firstChild);

  if (result) {
    const p = document.createElement("p");
    const text = document.createElement("span");
    text.textContent = `ID: ${result.id} - ${result.title} (${result.year}) - `;
    const stars = buildStarDisplay(result.rating, result.id); // clickable
    p.appendChild(text);
    p.appendChild(stars);
    listBox.appendChild(p);
  } else {
    const p = document.createElement("p");
    p.textContent = "No movie found with that ID.";
    listBox.appendChild(p);
  }

  idInput.value = "";
}

// Search Movie by Title Function

function searchByTitle() {
  const titleInput = document.getElementById("searchTitle");
  const value = titleInput.value.toLowerCase().trim();
  if (value === "") {
    alert("Enter a title to search.");
    return;
  }

  const results = movieList.findByTitle(value);
  const listBox = document.getElementById("movieList");
  while (listBox.firstChild) listBox.removeChild(listBox.firstChild);

  if (results.length === 0) {
    const p = document.createElement("p");
    p.textContent = "No movies found.";
    listBox.appendChild(p);
  } else {
    results.forEach((movie) => {
      const p = document.createElement("p");
      const text = document.createElement("span");
      text.textContent = `ID: ${movie.id} - ${movie.title} (${movie.year}) - `;
      const stars = buildStarDisplay(movie.rating, movie.id); // clickable
      p.appendChild(text);
      p.appendChild(stars);
      listBox.appendChild(p);
    });
  }

  titleInput.value = "";
}

// Sort A-Z
function sortAZ() {
  movieList.sortAZ();
  displayList();
}

// Sort Z-A
function sortZA() {
  movieList.sortZA();
  displayList();
}

// Sort Best Movies
function sortBest() {
  movieList.sortBest();
  displayList();
}

// Add Refresh Functionality
function refreshList() {
  movieList.restoreOriginal();
  displayList();
}
