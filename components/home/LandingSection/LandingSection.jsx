"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Script from "next/script";
import bg1 from "./assets/bg1.png";
import bg2 from "./assets/bg2.png";
import bg3 from "./assets/bg3.png";

const backgroundImages = [bg1, bg2, bg3];

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const initialized = useRef(false);

  // Automatically cycle through background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % backgroundImages.length
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Initialize TireConnect only after script is loaded
  useEffect(() => {
    if (scriptLoaded && !initialized.current && window.TCWidget) {
      initialized.current = true;
      console.log("Initializing TireConnect after script load...");

      // Safe timeout to ensure DOM is ready
      setTimeout(() => {
        try {
          window.TCWidget.initForm({
            apikey: "6637aba88ecf90ed53e09ddae683bc65",
            container: "tireconnect",
            locationDetect: "manual",
            redirectUrl: "/shop-tires/",
          });
          console.log("TireConnect initialized!");
        } catch (error) {
          console.error("Error initializing TireConnect:", error);
        }
      }, 500);
    }
  }, [scriptLoaded]);

  return (
    <div className="relative h-screen w-full">
      {/* Properly load TireConnect script using Next.js Script component */}
      <Script
        id="tireconnect-script"
        src="https://app.tireconnect.ca/js/widget.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log("TireConnect script loaded!");
          setScriptLoaded(true);
        }}
        onError={() => {
          console.error("Failed to load TireConnect script");
        }}
      />

      {/* Background Image Slideshow */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence>
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <Image
              src={backgroundImages[currentImageIndex]}
              alt={`Background ${currentImageIndex + 1}`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
              className="object-cover"
              style={{ filter: "brightness(50%)" }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-2 sm:px-4 lg:px-4 h-full flex items-center justify-center">
        <div className="justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-white"
          >
            {/* Tagline */}
            <div className="text-violet-300 font-medium text-lg text-center">
              WE SAVE YOU TIME
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-center">
              So You Can Go Back to
              <br />
              Doing the Things You Love!
            </h1>

            {/* CTA Button */}
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-violet-600 mt-8 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-violet-700 transition-colors duration-300 inline-block"
              href="/shop-tires/"
            >
              SHOP FOR TIRES
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Tire Finder Section with very basic implementation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
        className="absolute -bottom-32 left-0 right-0 py-6 z-20 md:bottom-20 lg:bottom-20"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
            {/* Very simple container with no extra styling or handlers */}
            <div id="tireconnect" className="w-full"></div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
