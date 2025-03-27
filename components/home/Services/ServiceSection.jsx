"use client";

import React from "react";
import ServiceCard from "./ServiceCard";
import { motion } from "framer-motion";
import tireImg from "./assets/tires-img.png";
import alignmentImg from "./assets/alignments-img.png";
import brakeImg from "./assets/brake-img.png";
import oilImg from "./assets/oil-img.png";

const ServiceSection = () => {
  const services = [
    {
      title: "Tire and Wheel Services",
      imageSrc: tireImg,
      link: "https://tirestoretx.com/tire-and-wheel-services/",
    },
    {
      title: "Alignments",
      imageSrc: alignmentImg,
      link: "https://tirestoretx.com/alignments/",
    },
    {
      title: "Brake Repair",
      imageSrc: brakeImg,
      link: "https://tirestoretx.com/brake-repair/",
    },
    {
      title: "Lube, Oils and Filters",
      imageSrc: oilImg,
      link: "https://tirestoretx.com/lube-oils-and-filters/",
    },
  ];

  return (
    <section className="px-4 pt-32 pb-24 md:px-9 lg:px-20 bg-white">
      <div className="container mx-auto">
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center mb-4"
          >
            <div className="w-8 h-1 bg-violet-600 mr-3"></div>
            <p className="text-gray-700 uppercase font-medium tracking-wide">
              OUR SERVICES
            </p>
          </motion.div>

          <div className="md:flex md:items-start md:justify-between align-center">
            <motion.h2
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-6 md:mb-0 md:w-1/2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              How We Take Care of Your Car
            </motion.h2>

            <motion.p
              className="text-gray-600 md:w-1/2 lg:text-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              We offer tire services and maintenance for vehicle owners
              throughout the DFW area. Our technicians specialize in everything
              from tire installation and rotation to alignment, balancing, and
              emergency repairs.
            </motion.p>
          </div>
        </div>

        <ServiceCard services={services} />

        <div className="flex flex-col md:flex-row items-center justify-center">
          <motion.h3
            className="text-xl text-center mx-4 md:text-2xl font-bold text-gray-800 mb-6 md:mb-0"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Want to know more?
          </motion.h3>

          <motion.button
            className="bg-violet-600 hover:bg-violet-700 text-white font-medium mx-4 py-3 px-6 rounded-lg w-full md:w-auto"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            href="/services/"
          >
            VIEW ALL SERVICES
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
