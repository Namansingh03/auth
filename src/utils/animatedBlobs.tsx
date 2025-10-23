"use client"

import React from "react";
import { motion } from "framer-motion";

const blobs = [
  {
    size: "w-80 h-80",
    gradient: "from-pink-500 to-yellow-500",
    top: "10%",
    left: "15%",
    duration: 12,
    x: [0, 50, -50, 0],
    y: [0, -30, 30, 0],
  },
  {
    size: "w-96 h-96",
    gradient: "from-blue-500 to-purple-500",
    top: "30%",
    left: "60%",
    duration: 10,
    x: [0, -60, 60, 0],
    y: [0, 40, -40, 0],
  },
  {
    size: "w-80 h-80",
    gradient: "from-green-400 to-teal-500",
    top: "50%",
    left: "25%",
    duration: 14,
    x: [0, 40, -40, 0],
    y: [0, -50, 50, 0],
  },
  {
    size: "w-64 h-64",
    gradient: "from-red-400 to-pink-600",
    top: "70%",
    left: "70%",
    duration: 11,
    x: [0, -30, 30, 0],
    y: [0, 20, -20, 0],
  },
];

const AnimatedBlobsBackground = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-[-1]">
      {blobs.map((blob, index) => (
        <motion.div
          key={index}
          className={`absolute ${blob.size} bg-linear-to-r ${blob.gradient} rounded-full mix-blend-multiply filter blur-3xl opacity-70`}
          style={{ top: blob.top, left: blob.left }}
          animate={{
            x: blob.x,
            y: blob.y,
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedBlobsBackground;
