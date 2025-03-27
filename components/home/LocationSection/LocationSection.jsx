"use client";

// LocationsSection.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Location data with addresses and information
const locationData = {
  "Bedford, TX": [
    {
      name: "CENTRAL",
      address: "2025 Pipeline Rd. Bedford TX 76022",
      phone: "(817) 986-0016",
    },
    {
      name: "BEDFORD",
      address: "3928 Harwood Rd Bedford TX 76021",
      phone: "(817) 571-2453",
    },
  ],
  "Euless, TX": [
    {
      name: "EULESS",
      address: "4001 S. Highway 157, Euless, TX 76040",
      phone: "(817) 283-5844",
    },
  ],
  "Coppell, TX": [
    {
      name: "COPPELL",
      address: "825 S MacArthur Blvd, Coppell, TX 75019",
      phone: "(972) 393-2356",
    },
  ],
  "Saginaw, TX": [
    {
      name: "SAGINAW",
      address: "108 Anderson St, Saginaw, TX 76179",
      phone: "(817) 847-7476",
    },
  ],
  "Cleburne, TX": [
    {
      name: "CLEBURNE",
      address: "1002 South Caddo St, Cleburne, TX 76031",
      phone: "(817) 641-3217",
    },
  ],
  "Bridgeport, TX": [
    {
      name: "BRIDGEPORT",
      address: "712 us 380, Bridgeport, TX 76426",
      phone: "(940) 683-2886",
    },
  ],
  "Greenville, TX": [
    {
      name: "GREENVILLE",
      address: "3306 Wesley St, Greenville, TX 75401",
      phone: "(903) 455-5836",
    },
  ],
  "Bowie, TX": [
    {
      name: "BOWIE",
      address: "209 E Wise St, Bowie, TX 76230",
      phone: "(940) 872-1134",
    },
  ],
  "Palestine, TX": [
    {
      name: "PALESTINE",
      address: "2420 State Hwy 155, Palestine, TX 75803",
      phone: "(903) 723-3251",
    },
  ],
};

// Google Maps icon component
const GoogleMapsIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" />
  </svg>
);

const LocationsSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [locations, setLocations] = useState([]);
  const dropdownRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  // Cities list
  const cities = Object.keys(locationData);

  // Handle initial mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Handle city selection
  const selectCity = (city) => {
    // If same city selected, don't trigger animation
    if (city === selectedCity) {
      setIsOpen(false);
      return;
    }

    // Clear locations first to allow animations to work properly
    setLocations([]);

    // Small timeout for smoother transition
    setTimeout(() => {
      setSelectedCity(city);
      setLocations(locationData[city] || []);
    }, 50);

    setIsOpen(false);
  };

  return (
    <div
      id="locations"
      className="py-16 px-4 md:px-9 lg:px-20 bg-[#1a1a21] text-white"
    >
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <div className="w-8 h-0.5 bg-violet-600"></div>
            <p className="mx-2 text-white font-medium tracking-wide">
              LOCATIONS
            </p>
          </div>
          <h2 className="text-4xl font-bold mb-4">Visit Us Today</h2>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Left Column - City Selection */}
          <div>
            <p className="text-gray-300 mb-6">
              We have multiple locations all throughout the DFW area, find the
              one closest to you! Select a city down below:
            </p>

            {/* City Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="flex items-center justify-between w-full p-4 rounded-md bg-gray-200 bg-opacity-10 text-white border border-gray-700 focus:outline-none"
                aria-expanded={isOpen}
                aria-haspopup="listbox"
              >
                <span>{selectedCity || "Select your city"}</span>
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </motion.svg>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.ul
                    className="absolute z-10 w-full mt-1 rounded-md bg-[#21232A] shadow-lg max-h-60 overflow-auto"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ type: "tween", duration: 0.2 }}
                    role="listbox"
                  >
                    {cities.map((city) => (
                      <li
                        key={city}
                        className={`cursor-pointer p-4 hover:bg-gray-700 transition-colors duration-150 ${
                          selectedCity === city ? "bg-gray-700" : ""
                        }`}
                        onClick={() => selectCity(city)}
                        role="option"
                        aria-selected={selectedCity === city}
                      >
                        {city}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column - Location Results */}
          <div>
            <AnimatePresence mode="wait">
              {locations.length > 0 ? (
                <motion.div
                  key="locations-wrapper"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {locations.map((location, index) => (
                    <motion.div
                      key={`${selectedCity}-${location.name}`}
                      className="bg-gray-200 bg-opacity-10 rounded-lg p-6 mb-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        type: "spring",
                        damping: 25,
                        stiffness: 300,
                        delay: index * 0.1,
                      }}
                    >
                      <h3 className="text-xl font-semibold mb-1">
                        {location.name}
                      </h3>
                      <div className="w-full h-0.5 bg-violet-600 mb-4"></div>
                      <p className="text-gray-300 mb-1">{location.address}</p>
                      <p className="text-gray-300 mb-4">{location.phone}</p>

                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          location.address
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-white hover:text-violet-400 transition-colors duration-200 font-bold underline"
                      >
                        <span className="mr-2 text-violet-400">
                          <GoogleMapsIcon />
                        </span>
                        Go To Google Maps
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 ml-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="empty-state"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex items-center justify-center"
                >
                  {selectedCity ? (
                    <p className="text-gray-500">
                      No locations found for {selectedCity}
                    </p>
                  ) : (
                    <p className="text-gray-500"></p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* CTA Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between pt-8">
          <h3 className="text-2xl font-bold mb-4 md:mb-0">
            Don't forget to get your discount before stopping by!
          </h3>
          <motion.a
            href="#discount"
            className="bg-violet-600 hover:bg-violet-700 text-white py-3 px-8 rounded-md font-medium inline-block text-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            GET 10% OFF MY FIRST VISIT
          </motion.a>
        </div>
      </div>
    </div>
  );
};

export default LocationsSection;
