"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Save logged in user, modify BE if its needed
  const [user, setUser] = useState(null);
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Fungsi untuk menangani scroll
  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      // Scroll ke bawah
      setHidden(true);
    } else {
      // Scroll ke atas
      setHidden(false);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    const userData = JSON.parse(localStorage.getItem("user")); // Simpan data user di localStorage setelah login
    if (userData) {
      setIsLoggedIn(true); // Jika user data ada, set status login ke true
      setUser(userData); // Simpan data user di state
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);


  return (
    <nav className={`fixed top-0 w-full bg-white/90 backdrop-blur-lg z-50 shadow-md transition-transform duration-300 ease-in-out ${
        hidden ? "-translate-y-full" : "translate-y-0"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img src="/icons/Logo.png" alt="Paw Logo" className="w-[136px]" />
        </div>

        <div className="hidden md:flex space-x-[50px] text-[18px]">
          <Link href="/" className="text-[#F3AAB5] hover:scale-110 transition-all duration-300 ease-in-out">Home</Link>
          <Link href="/#AddPet" className="text-[#F3AAB5] hover:scale-110 transition-all duration-300 ease-in-out">My Pet</Link>
          <Link href="/#Features" className="text-[#F3AAB5] hover:scale-110 transition-all duration-300 ease-in-out">Features</Link>
          <Link href="/#Galeri" className="text-[#F3AAB5] hover:scale-110 transition-all duration-300 ease-in-out">Gallery</Link>
          <Link href="/#Artikel" className="text-[#F3AAB5] hover:scale-110 transition-all duration-300 ease-in-out">Article</Link>
        </div>

        {/* Kondisi tombol atau profil */}
        <div className="hidden md:flex items-center space-x-4 text-[16px]">
          {isLoggedIn ? (
            <div className="flex items-center space-x-2">
              {/* Foto Profil */}
              <img
                src={user?.profilePhoto || "/icons/DefaultProfPic.png"}
                alt="User Profile"
                className="w-8 h-8 rounded-full border border-[#FFBCC3]"
              />
              {/* Username User */}
              <span className="bg-[#FFBCC3] text-white px-4 py-2 rounded-[56.76px]">
                {user?.username || "User"}
              </span>
            </div>
          ) : (
            <>
              <a
                href="/signup"
                className="bg-[#FFBCC3] text-white w-[105px] h-[40px] rounded-[56.76px] flex items-center justify-center hover:font-bold transition-all duration-300 ease-in-out"
              >
                Daftar
              </a>
              <a
                href="/login"
                className="bg-[#FBEBD4] text-[#F3AAB5] w-[105px] h-[40px] rounded-[56.76px] flex items-center justify-center hover:font-bold transition-all duration-300 ease-in-out"
              >
                Masuk
              </a>
            </>
          )}
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-[#F3AAB5]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>1
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden px-4 py-2 bg-white/90 backdrop-blur-lg space-y-2 text-[16px]">
          <Link href="/" className="block py-2 text-[#F3AAB5] hover:font-bold transition-all duration-300 ease-in-out">Home</Link>
          <Link href="/#AddPet" className="block py-2 text-[#F3AAB5] hover:font-bold transition-all duration-300 ease-in-out">My Pet</Link>
          <Link href="/#Features" className="block py-2 text-[#F3AAB5] hover:font-bold transition-all duration-300 ease-in-out">Features</Link>
          <Link href="/#Galeri" className="block py-2 text-[#F3AAB5] hover:font-bold transition-all duration-300 ease-in-out">Gallery</Link>
          <Link href="/#Artikel" className="block py-2 text-[#F3AAB5] hover:font-bold transition-all duration-300 ease-in-out">Article</Link>
        </div>
      )}
    </nav>
  );
}