// File: script.js
// Description: File to answer questions from Part 5 of assessment JSAT 2
// Author: Michael Deak
// Date: 16/11/2025
// Version: 1.00

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
  const id = Number(document.getElementById("movieId").value);
  const title = document.getElementById("movieTitle").value.trim();
  const year = document.getElementById("movieYear").value;
  const rating = Number(document.getElementById("movieRating").value);

  if (!id || id <= 0) {
    alert("ID must be a positive number.");
    return;
  }
  if (movieList.movies.some((m) => m.id === id)) {
    alert("That Movie ID already exists.");
    return;
  }
  if (!title || !year || !rating) {
    alert("Please fill in all fields.");
    return;
  }

  movieList.add(new Movie(id, title, year, rating));
  alert("Movie Added!");
  displayList(movieList.movies);
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

function displayList(list) {
  const box = document.getElementById("movieList");
  box.replaceChildren();

  list.forEach((m) => {
    const p = document.createElement("p");
    p.textContent = `ID: ${m.id} - ${m.title} (${m.year}) - `;
    const starsContainer = document.createElement("span");

    for (let i = 1; i <= 5; i++) {
      const star = document.createElement("span");
      star.textContent = i <= m.rating ? "⭐" : "☆";
      star.addEventListener("click", () => {
        m.rating = i;
        displayList(list);
      });
      starsContainer.appendChild(star);
    }

    p.appendChild(starsContainer);
    box.appendChild(p);
  });
}
