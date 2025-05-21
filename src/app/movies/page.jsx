"use client";
import { useEffect, useState } from "react";

export default function MoviesPage() {
  const [moviesByCategory, setMoviesByCategory] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      const res = await fetch("http://localhost:5000/api/movies/by-category");
      const data = await res.json();
      setMoviesByCategory(data);
    }
    fetchMovies();
  }, []);

  return (
    <main className="min-h-screen p-6 text-white bg-black">
      <h1 className="text-3xl font-bold mb-6">Movies by Category</h1>

      {moviesByCategory.map((categoryBlock) => (
        <div key={categoryBlock._id} className="mb-8">
          <h2 className="text-2xl mb-2">{categoryBlock._id}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {categoryBlock.movies.map((movie) => (
              <div key={movie._id} className="bg-gray-800 p-2 rounded">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="h-60 w-full object-cover mb-2"
                />
                <h3 className="text-sm font-bold">{movie.title}</h3>
                <p className="text-xs text-gray-400">{movie.year}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </main>
  );
}
