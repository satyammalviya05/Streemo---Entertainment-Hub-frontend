"use client";

import Link from "next/link";

const Navbar = () => {
  return (
    <header className="bg-black text-white px-6 py-4 flex justify-between items-center shadow">
      <h1 className="text-2xl font-bold">
        <Link href="/">Streemo</Link>
      </h1>

      <nav className="space-x-4 text-sm md:text-base">
        <Link href="/" className="hover:text-gray-400">Home</Link>
        <Link href="/movies" className="hover:text-gray-400">Movies</Link>
        <Link href="/shows" className="hover:text-gray-400">TV Shows</Link>
        <Link href="/login" className="hover:text-gray-400">Login</Link>
        <Link href="/upload" className="hover:underline">
          Upload
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
