"use client";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

export default function WatchPage({ params }) {
    const { id } = params;
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        async function fetchMovie() {
            try {
                const res = await fetch(
                    `https://www.omdbapi.com/?i=${id}&apikey=4c9ad805`
                );
                const data = await res.json();
                setMovie(data);
            } catch (error) {
                console.error("Failed to fetch movie:", error);
            }
        }

        fetchMovie();
    }, [id]);

    if (!movie) return <div className="text-white p-6">Loading...</div>;

    return (
        <div className="min-h-screen bg-black text-white p-6">
            <div className="max-w-5xl mx-auto">
                <img
                    src={movie.Poster}
                    alt={movie.Title}
                    className="rounded-xl mb-6 w-full max-h-[500px] object-cover"
                />
                <h1 className="text-3xl font-bold mb-2">{movie.Title}</h1>
                <p className="text-gray-400 mb-4">{movie.Year} • {movie.Genre}</p>
                <p className="mb-6">{movie.Plot}</p>

                    <ReactPlayer
                        url="https://www.youtube.com/watch?v=d96cjJhvlMA" // Guardians trailer
                        controls
                        width="100%"
                        height="480px"
                    />
            </div>
        </div>
    );
}
