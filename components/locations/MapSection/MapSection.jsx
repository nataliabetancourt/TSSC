"use client";

// components/LocationsPage.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";

const animationProps = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: "easeOut" },
};

const LOCATIONS = {
  "Bedford, TX": [
    {
      name: "CENTRAL",
      address: "2025 Pipeline Rd. Bedford TX 76022",
      phone: "(817) 986-0016",
      coordinates: { lat: 32.8371, lng: -97.1458 }, // Example coordinates, replace with actual
    },
    {
      name: "BEDFORD",
      address: "3928 Harwood Rd Bedford TX 76021",
      phone: "(817) 571-2453",
      coordinates: { lat: 32.8456, lng: -97.1372 }, // Example coordinates, replace with actual
    },
  ],
  "Euless, TX": [
    {
      name: "EULESS",
      address: "4001 S. Highway 157, Euless, TX 76040",
      phone: "(817) 283-5844",
      coordinates: { lat: 32.8232, lng: -97.0818 }, // Example coordinates, replace with actual
    },
  ],
  "Coppell, TX": [
    {
      name: "COPPELL",
      address: "825 S MacArthur Blvd, Coppell, TX 75019",
      phone: "(972) 393-2356",
      coordinates: { lat: 32.9545, lng: -96.9584 }, // Example coordinates, replace with actual
    },
  ],
  "Saginaw, TX": [
    {
      name: "SAGINAW",
      address: "108 Anderson St, Saginaw, TX 76179",
      phone: "(817) 847-7476",
      coordinates: { lat: 32.8603, lng: -97.3625 }, // Example coordinates, replace with actual
    },
  ],
  "Cleburne, TX": [
    {
      name: "CLEBURNE",
      address: "1002 South Caddo St, Cleburne, TX 76031",
      phone: "(817) 641-3217",
      coordinates: { lat: 32.3474, lng: -97.3908 }, // Example coordinates, replace with actual
    },
  ],
  "Bridgeport, TX": [
    {
      name: "BRIDGEPORT",
      address: "712 us 380, Bridgeport, TX 76426",
      phone: "(940) 683-2886",
      coordinates: { lat: 33.2076, lng: -97.757 }, // Example coordinates, replace with actual
    },
  ],
  "Greenville, TX": [
    {
      name: "GREENVILLE",
      address: "3306 Wesley St, Greenville, TX 75401",
      phone: "(903) 455-5836",
      coordinates: { lat: 33.1294, lng: -96.1108 }, // Example coordinates, replace with actual
    },
  ],
  "Bowie, TX": [
    {
      name: "BOWIE",
      address: "209 E Wise St, Bowie, TX 76230",
      phone: "(940) 872-1134",
      coordinates: { lat: 33.5615, lng: -97.8428 }, // Example coordinates, replace with actual
    },
  ],
  "Palestine, TX": [
    {
      name: "PALESTINE",
      address: "2420 State Hwy 155, Palestine, TX 75803",
      phone: "(903) 723-3251",
      coordinates: { lat: 31.7546, lng: -95.6346 }, // Example coordinates, replace with actual
    },
  ],
};

function MapSection() {
  const [activeLocation, setActiveLocation] = useState(
    LOCATIONS["Bedford, TX"][0]
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const timeoutRef = useRef(null);

  // Function to calculate distance between two points using Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 3958.8; // Radius of the Earth in miles
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in miles
    return distance;
  };

  // Get all locations as a flat array
  const getAllLocations = () => {
    const allLocations = [];
    Object.entries(LOCATIONS).forEach(([city, locations]) => {
      locations.forEach((location) => {
        allLocations.push({ ...location, city });
      });
    });
    return allLocations;
  };

  // Cleanup function to clear timeout
  const cleanupTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => cleanupTimeout();
  }, []);

  // Find nearest location
  const findNearestLocation = () => {
    setIsLoading(true);

    if (!navigator.geolocation) {
      setModalMessage("Geolocation is not supported by your browser");
      setIsModalOpen(true);
      setIsLoading(false);
      return;
    }

    // Set a timeout for 10 seconds
    timeoutRef.current = setTimeout(() => {
      setIsLoading(false);
      setModalMessage(
        "Seems like there is not a store around you at this moment, please try again later."
      );
      setIsModalOpen(true);
      // Cancel the geolocation request if it's still pending
      if (navigator.geolocation.clearWatch) {
        navigator.geolocation.clearWatch(watchId);
      }
    }, 10000);

    // Variable to store the watchId for clearing if needed
    let watchId;

    // Get current position
    watchId = navigator.geolocation.getCurrentPosition(
      (position) => {
        // Clear the timeout as we got a response
        cleanupTimeout();

        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        const allLocations = getAllLocations();
        let nearestLocation = null;
        let shortestDistance = Infinity;

        allLocations.forEach((location) => {
          const distance = calculateDistance(
            userLat,
            userLng,
            location.coordinates.lat,
            location.coordinates.lng
          );

          if (distance < shortestDistance) {
            shortestDistance = distance;
            nearestLocation = location;
          }
        });

        if (nearestLocation && shortestDistance <= 20) {
          // Found a location within 20 miles
          setActiveLocation(nearestLocation);
          setModalMessage(
            `Found ${nearestLocation.name} in ${
              nearestLocation.city
            }, ${shortestDistance.toFixed(1)} miles away from you!`
          );
          setIsModalOpen(true);
        } else {
          // No locations within 20 miles
          setModalMessage(
            "Seems like there is not a store around you at this moment, but we hope there will be soon!"
          );
          setIsModalOpen(true);
        }

        setIsLoading(false);
      },
      (error) => {
        // Clear the timeout as we got an error response
        cleanupTimeout();

        setModalMessage(
          "Unable to retrieve your location. Please enable location services and try again."
        );
        setIsModalOpen(true);
        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 9500, // Set slightly less than our main timeout
        maximumAge: 0,
      }
    );
  };

  return (
    <div className="w-full bg-white py-24 px-4 md:px-9 lg:px-20 text-gray-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-6 h-1 bg-violet-600"></div>
            <span className="text-gray-700 font-medium uppercase">
              LOCATIONS
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Visit Us Today!
          </h1>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-8">
            <p className="text-lg text-gray-800">
              We have multiple locations all throughout the DFW area, find the
              one closest to you!
            </p>

            {/* Find Nearest Button */}
            <button
              onClick={findNearestLocation}
              disabled={isLoading}
              className="flex items-center justify-center bg-violet-600 hover:bg-violet-700 text-white px-4 py-3 rounded-lg transition-colors disabled:opacity-70 whitespace-nowrap"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Finding nearest location...</span>
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span>Find nearest to me</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Location List */}
          <div className="lg:col-span-1 md:max-h-[620px] overflow-y-auto">
            <div className="space-y-6">
              {Object.entries(LOCATIONS).map(([city, locations]) => (
                <div key={city} className="space-y-4">
                  {locations.map((location) => (
                    <div
                      key={location.name}
                      className={`p-6 bg-gray-50 border-l-4 ${
                        activeLocation.name === location.name
                          ? "border-violet-600"
                          : "border-gray-200"
                      } rounded-sm shadow-sm hover:shadow cursor-pointer transition-all`}
                      onClick={() => setActiveLocation(location)}
                    >
                      <h3 className="text-xl font-medium text-violet-600 mb-2">
                        {location.name}
                      </h3>
                      <p className="text-gray-700 mb-1">{location.address}</p>
                      <p className="text-gray-700 mb-4">{location.phone}</p>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          location.address
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-violet-600 hover:text-violet-800"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2"
                        >
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        Get Directions
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="ml-1"
                        >
                          <path d="M5 12h14"></path>
                          <path d="m12 5 7 7-7 7"></path>
                        </svg>
                      </a>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Map Section */}
          <div className="lg:col-span-2">
            <div className="h-[600px] rounded-lg overflow-hidden border border-gray-200 shadow-md">
              <iframe
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDv5XY162D4hoPDLwAXGRu5-AasJfVbR_E&q=${encodeURIComponent(
                  activeLocation.address
                )}`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-sm text-gray-500">
                Click on a location to view on map
              </span>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  activeLocation.address
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-violet-600 hover:text-violet-800 text-sm flex items-center"
              >
                Open in Google Maps
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-1"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                {modalMessage.includes("not a store around") ||
                modalMessage.includes("Unable to retrieve") ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-yellow-500"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-500"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                )}
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {modalMessage.includes("not a store around") ||
                modalMessage.includes("Unable to retrieve")
                  ? "No Nearby Locations"
                  : "Location Found"}
              </h3>
              <p className="text-gray-600 mb-6">{modalMessage}</p>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MapSection;
