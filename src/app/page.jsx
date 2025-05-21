"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("streemo-search-history")) || [];
    setSearchHistory(history);
  }, []);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const ids = [
          "tt3896198", // Guardians
          "tt4154796", // Endgame
          "tt1375666", // Inception
        ];
        const results = await Promise.all(
          ids.map((id) =>
            fetch(`https://www.omdbapi.com/?i=${id}&apikey=4c9ad805`).then((res) =>
              res.json()
            )
          )
        );
        setMovies(results);
      } catch (error) {
        console.error("Error fetching OMDb movies:", error);
      }
    }

    fetchMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    try {
      const res = await fetch(
        `https://www.omdbapi.com/?s=${encodeURIComponent(searchTerm)}&apikey=4c9ad805`
      );
      const data = await res.json();

      if (data.Search) {
        setSearchResults(data.Search);
      } else {
        setSearchResults([]);
      }

      // Update localStorage
      let updatedHistory = [searchTerm, ...searchHistory.filter((term) => term !== searchTerm)];
      updatedHistory = updatedHistory.slice(0, 5);
      setSearchHistory(updatedHistory);
      localStorage.setItem("streemo-search-history", JSON.stringify(updatedHistory));
    } catch (error) {
      console.error("Search failed:", error);
    }
  };
  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      <h1 className="text-4xl font-bold text-center mb-4">Streemo</h1>
      <p className="text-center text-gray-400 mb-10">A Entertainment Hub</p>

      <form onSubmit={handleSearch} className="mb-6 max-w-xl mx-auto flex">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 p-2 rounded-l bg-gray-800 text-white outline-none"
        />
        <button
          type="submit"
          className="bg-blue-600 px-4 rounded-r hover:bg-blue-700"
        >
          Search
        </button>
      </form>
      {searchHistory.length > 0 && (
        <div className="max-w-xl mx-auto mb-6 text-gray-400">
          <p className="mb-2">Recent Searches:</p>
          <div className="flex flex-wrap gap-2">
            {searchHistory.map((term) => (
              <button
                key={term}
                onClick={() => {
                  setSearchTerm(term);
                  handleSearch({ preventDefault: () => { } });
                }}
                className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}

      <h2 className="text-2xl font-semibold mb-4">🎬 Featured Movies</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <Link key={movie.imdbID} href={`/watch/${movie.imdbID}`} passHref>
            <div className="bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition cursor-pointer">
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="w-full h-72 object-cover"
              />
              <div className="p-2">
                <h3 className="text-sm font-bold">{movie.Title}</h3>
                <p className="text-xs text-gray-400">{movie.Year}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {searchResults.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mb-4">🔎 Search Results</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {searchResults.map((movie) => (
              <Link
                key={movie.imdbID}
                href={`/watch/${movie.imdbID}`}
                className="bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition"
              >
                <img
                  src={
                    movie.Poster !== "N/A"
                      ? movie.Poster
                      : "https://via.placeholder.com/300x450?text=No+Image"
                  }
                  alt={movie.Title}
                  className="w-full h-72 object-cover"
                />
                <div className="p-2">
                  <h3 className="text-sm font-bold">{movie.Title}</h3>
                  <p className="text-xs text-gray-400">{movie.Year}</p>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
