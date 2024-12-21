// components/UserfypClient.js
"use client"
import { Image } from "@nextui-org/react";
import { useEffect, useState } from 'react';
import {User} from "@nextui-org/react";

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
      <div className=" m-5 border rounded-md p-5">
        <div className="flex flex-col gap-[0.3rem]">
          <div className="">
             <User
      avatarProps={{
        src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
      }}
      name="Jane Doe"
    />
           </div>
        <p>this is the caption</p>
       </div>
         <Image
        src="https://app.requestly.io/delay/5000/https://nextui.org/images/hero-card-complete.jpeg"
        alt="NextUI hero Image with delay"
        width={isMobile ? 300 : 500}
        height={isMobile ? 200 : 300}
        objectFit="cover"
        />
        <div className=" ml-1 pt-2 flex flex-row gap-2 ">
                <Image
            src="/image/not-fill-heart.png"
            alt="Like"
            width={24}
            height={24}
            className="w-5 h-3 cursor-pointer mx-1"
          />
          <Image
            src="/image/comments.png"
            alt="Like"
            width={24}
            height={24}
            className="w-5 h-4 cursor-pointer mx-1"
          />
        </div>
     </div>
    </div>
  );
}
