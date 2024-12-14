// components/UserfypClient.js
"use client"
import { Image } from "@nextui-org/react";
import { useEffect, useState } from 'react';

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
      <div className=" m-5">
        <div className="flex flex-col gap-[0.3rem]">
           <h1 className="font-semibold lg:text-3xl text-4xl">yocorangelo18@gmail.com</h1>
        <p>this is the caption</p>
       </div>
         <Image
        src="https://app.requestly.io/delay/5000/https://nextui.org/images/hero-card-complete.jpeg"
        alt="NextUI hero Image with delay"
        width={isMobile ? 300 : 500}
        height={isMobile ? 200 : 300}
        objectFit="cover"
      />
     </div>
    </div>
  );
}
