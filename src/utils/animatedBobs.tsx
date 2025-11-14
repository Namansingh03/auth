"use client";

import React from "react";
import {motion} from "framer-motion"

const blobs = [
  {
    size: "w-80 h-80",
    gradientLight: "from-pink-400 to-yellow-400",
    gradientDark: "from-pink-700 to-yellow-600",
    top: "10%",
    left: "15%",
    duration: 12,
    x: [0, 50, -50, 0],
    y: [0, -30, 30, 0],
  },
  {
    size: "w-96 h-96",
    gradientLight: "from-blue-400 to-purple-400",
    gradientDark: "from-blue-800 to-purple-700",
    top: "30%",
    left: "60%",
    duration: 10,
    x: [0, -60, 60, 0],
    y: [0, 40, -40, 0],
  },
  {
    size: "w-80 h-80",
    gradientLight: "from-green-300 to-teal-400",
    gradientDark: "from-green-700 to-teal-600",
    top: "50%",
    left: "25%",
    duration: 14,
    x: [0, 40, -40, 0],
    y: [0, -50, 50, 0],
  },
  {
    size: "w-64 h-64",
    gradientLight: "from-red-300 to-pink-500",
    gradientDark: "from-red-700 to-pink-700",
    top: "70%",
    left: "70%",
    duration: 11,
    x: [0, -30, 30, 0],
    y: [0, 20, -20, 0],
  },
];

const AnimatedBlobsBackground = () => {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden -z-10">
      {blobs.map((blob, index) => (
        <motion.div
          key={index}
          className={`absolute ${blob.size} 
            bg-linear-to-r 
            ${blob.gradientLight} 
            dark:${blob.gradientDark} 
            rounded-full 
            mix-blend-multiply 
            filter blur-3xl 
            opacity-60 dark:opacity-40`}
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