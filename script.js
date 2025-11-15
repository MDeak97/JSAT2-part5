// File: script.js
// Description: File to answer questions from Part 5 of assessment JSAT 2
// Author: Michael Deak
// Date: 15/11/2025
// Version: 1.00

// CLASSES & MOVIE DATA

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
