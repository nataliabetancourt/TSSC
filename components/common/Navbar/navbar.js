"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import logo from "./assets/logo.png";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 py-2 md:py-4 transition-all duration-300 bg-black/80 backdrop-blur-sm shadow-lg`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="h-12 md:h-16 relative"
          >
            <Link href="/">
              {/* Use a placeholder logo or your actual logo */}
              <Image
                src={logo}
                alt="Tire Store Service Center Logo"
                width={160}
                height={48}
                className="w-auto h-12 md:h-16"
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="hidden md:flex items-center space-x-6 lg:space-x-10"
          >
            {/* Tires Dropdown */}
            <div className="relative group">
              <button className="text-white font-medium flex items-center">
                Tires
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {/* Dropdown menu */}
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right">
                <Link
                  href="/shop-tires"
                  className="block px-4 py-2 text-gray-800 hover:bg-purple-100"
                >
                  Shop Tires
                </Link>
                <Link
                  href="/road-hazard-policy"
                  className="block px-4 py-2 text-gray-800 hover:bg-purple-100"
                >
                  Road Hazard Policy
                </Link>
              </div>
            </div>

            {/* Services Dropdown */}
            <div className="relative group">
              <button className="text-white font-medium flex items-center">
                Services
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {/* Dropdown menu */}
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right">
                <Link
                  href="/tire-services"
                  className="block px-4 py-2 text-gray-800 hover:bg-purple-100"
                >
                  Tire Services
                </Link>
                <Link
                  href="/additional-services"
                  className="block px-4 py-2 text-gray-800 hover:bg-purple-100"
                >
                  Additional Services
                </Link>
              </div>
            </div>

            {/* Locations and Contact */}
            <Link
              href="/locations"
              className="text-white font-medium hover:text-purple-300 transition-colors"
            >
              Locations
            </Link>
            <Link
              href="/contact"
              className="text-white font-medium hover:text-purple-300 transition-colors"
            >
              Contact Us
            </Link>
          </motion.div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white focus:outline-none"
            >
              {mobileMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute top-full left-0 right-0 bg-black/90 backdrop-blur-sm"
          >
            <div className="px-4 pt-2 pb-4 space-y-2">
              <div className="relative group">
                <button className="w-full text-left text-white font-medium py-2 flex justify-between items-center">
                  Tires
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div className="pl-4 mt-2 space-y-2">
                  <Link
                    href="/shop-tires"
                    className="block text-white hover:text-purple-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Shop Tires
                  </Link>
                  <Link
                    href="/road-hazard-policy"
                    className="block text-white hover:text-purple-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Road Hazard Policy
                  </Link>
                </div>
              </div>
              <div className="relative group">
                <button className="w-full text-left text-white font-medium py-2 flex justify-between items-center">
                  Services
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div className="pl-4 mt-2 space-y-2">
                  <Link
                    href="/tire-services"
                    className="block text-white hover:text-purple-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Tire Services
                  </Link>
                  <Link
                    href="/additional-services"
                    className="block text-white hover:text-purple-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Additional Services
                  </Link>
                </div>
              </div>
              <Link
                href="/locations"
                className="block text-white font-medium py-2 hover:text-purple-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Locations
              </Link>
              <Link
                href="/contact"
                className="block text-white font-medium py-2 hover:text-purple-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
