import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Streemo",
  description: "A Entertainment Hub",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <Navbar /> {/* <-- Mount Navbar globally */}
        {children}
      </body>
    </html>
  );
}
