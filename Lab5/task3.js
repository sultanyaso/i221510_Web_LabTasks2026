const movieCollection = [];

function addMovie(title, director, genre, year) {
    const movie = { title, director, genre, year };
    movieCollection.push(movie);
}

function listMovies() {
    if (movieCollection.length === 0) {
        return "No movies in collection.";
    }

    return movieCollection
        .map((movie, index) => {
            return `${index + 1}. "${movie.title}" (${movie.year})
   Director: ${movie.director}
   Genre: ${movie.genre}`;
        })
        .join("\n\n");
}

function searchByDirector(director) {
    return movieCollection.filter(movie =>
        movie.director.toLowerCase() === director.toLowerCase()
    );
}

function searchByGenre(genre) {
    return movieCollection.filter(movie =>
        movie.genre.toLowerCase() === genre.toLowerCase()
    );
}

addMovie("Inception", "Christopher Nolan", "Sci-Fi", 2010);
addMovie("Interstellar", "Christopher Nolan", "Sci-Fi", 2014);
addMovie("The Dark Knight", "Christopher Nolan", "Action", 2008);
addMovie("Parasite", "Bong Joon-ho", "Thriller", 2019);

console.log(listMovies());
console.log(searchByDirector("christopher nolan"));
console.log(searchByGenre("sci-fi"));