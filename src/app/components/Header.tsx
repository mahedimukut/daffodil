"use client";

import React, { useState } from "react";
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import {
  Menu,
  X,
  LogIn,
  Star,
  Calendar,
  PlusSquare,
  LogOut,
} from "lucide-react";
import {
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa6";
import { signIn, signOut, useSession } from "next-auth/react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About us", href: "/about-us" },
  { name: "Our services", href: "/our-services" },
  { name: "Available rooms", href: "/available-rooms" },
  { name: "Contact us", href: "/contact-us" },
];

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { data: session, status } = useSession();

  return (
    <header className="bg-gray-50 shadow-sm sticky z-[50] h-20 inset-x-0 top-0 w-full border-b border-gray-100 transition-all">
      <MaxWidthWrapper className="flex items-center justify-between px-6">
        {/* Logo */}
        <Link href="/">
          <h1 className="text-2xl font-bold text-charcoalGray hover:text-black transition-colors duration-300">
            Daffodil
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-8">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="cursor-pointer font-medium text-gray-700 hover:text-charcoalGray transition-all duration-300"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Session Loading State */}
          {status === "loading" ? (
            <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div> // Placeholder while session loads
          ) : session?.user ? (
            <div className="relative">
              {/* Profile Photo */}
              <img
                src={session.user.image || "/default-profile.png"}
                alt="User Profile"
                className="w-10 h-10 rounded-full cursor-pointer border border-gray-300"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50 border border-gray-200">
                  <p className="px-4 py-2 text-gray-800 font-medium truncate">
                    {session.user.name}
                  </p>
                  <hr className="border-gray-200" />
                  <Link
                    href="/favourites"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-charcoalGray hover:bg-gray-100"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    <Star className="w-4 h-4" />
                    Favorites
                  </Link>
                  <Link
                    href="/bookings"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-charcoalGray hover:bg-gray-100"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    <Calendar className="w-4 h-4" />
                    Bookings
                  </Link>
                  {/* Show Add Rooms if admin */}
                  {session.user.email === "mokot222@gmail.com" && (
                    <Link
                      href="/admin/add-rooms"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-charcoalGray hover:bg-gray-100"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                      <PlusSquare className="w-4 h-4" />
                      Add Rooms
                    </Link>
                  )}
                  <button
                    onClick={() => signOut()}
                    className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href={"/auth/login"}>
              <button className="bg-daffodilYellow py-2 px-4 rounded-md text-charcoalGray hover:bg-softGreen transition-all duration-300 flex gap-2 items-center font-medium text-sm shadow-sm">
                <LogIn className="w-4 h-4" />
                Login
              </button>
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="lg:hidden"
          >
            {menuOpen ? (
              <X className="w-8 h-8 text-charcoalGray" />
            ) : (
              <Menu className="w-8 h-8 text-charcoalGray" />
            )}
          </button>
        </div>
      </MaxWidthWrapper>

      {/* Mobile Navigation Menu */}
      <div
        className={`fixed inset-0 bg-white z-[300] transition-transform duration-300 shadow-lg flex flex-col justify-between ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-charcoalGray">Daffodil</h1>
          <button onClick={() => setMenuOpen(false)}>
            <X className="w-8 h-8 text-charcoalGray" />
          </button>
        </div>

        <nav className="flex flex-col gap-8 p-8 text-center">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-medium text-charcoalGray hover:text-softGreen transition-all duration-300"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-8 border-t border-gray-200">
          <div className="text-center mb-6">
            <p className="text-lg font-medium text-charcoalGray">Contact Us</p>
            <p className="text-gray-600 text-sm mt-1">info@daffodil.com</p>
            <p className="text-gray-600 text-sm">+44 123 456 789</p>
          </div>

          <div className="flex justify-center gap-6">
            <Link href="https://facebook.com" target="_blank">
              <FaFacebookF className="text-charcoalGray text-2xl hover:text-softGreen transition-all duration-300" />
            </Link>
            <Link href="https://twitter.com" target="_blank">
              <FaXTwitter className="text-charcoalGray text-2xl hover:text-softGreen transition-all duration-300" />
            </Link>
            <Link href="https://instagram.com" target="_blank">
              <FaInstagram className="text-charcoalGray text-2xl hover:text-softGreen transition-all duration-300" />
            </Link>
            <Link href="https://linkedin.com" target="_blank">
              <FaLinkedinIn className="text-charcoalGray text-2xl hover:text-softGreen transition-all duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
