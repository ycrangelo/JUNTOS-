// components/UserfypClient.js
"use client"
import React, { useState, useEffect } from 'react';
import { Image } from "@nextui-org/react";

export default function UserfypClient() {
  const [windowWidth, setWindowWidth] = useState(null);

  useEffect(() => {
    // Set the initial window size on mount
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize(); // Update on initial mount
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize); // Cleanup
  }, []);

  if (windowWidth === null) return null; // Wait until the client-side code runs

  const isMobile = windowWidth <= 768;

  return (
    <div className="w-auto lg:w-full flex justify-center">
      <Image
        src="https://app.requestly.io/delay/5000/https://nextui.org/images/hero-card-complete.jpeg"
        alt="NextUI hero Image with delay"
        width={isMobile ? 300 : 500}
        height={isMobile ? 200 : 300}
        objectFit="cover"
      />
    </div>
  );
}
