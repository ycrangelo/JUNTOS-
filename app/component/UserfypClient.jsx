// components/UserfypClient.js
"use client"
import { Image } from "@nextui-org/react";
import { useEffect, useState } from 'react';
import { User } from "@nextui-org/react";
import {Input} from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

export default function UserfypClient() {
  const [windowWidth, setWindowWidth] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
   const [scrollBehavior, setScrollBehavior] = useState("inside");
  const [backdrop, setBackdrop] = useState("blur");

  useEffect(() => {
    // Set the initial window size on mount
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize(); // Update on initial mount
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize); // Cleanup
  }, []);

  if (windowWidth === null) return null; // Wait until the client-side code runs

   const handleOpen = (backdrop) => {
    setBackdrop(backdrop);
    onOpen();
  };

  const isMobile = windowWidth <= 768;

  return (
  <div className="flex flex-col items-center bg-gray-100 min-h-screen">
  <div className="w-full max-w-screen-sm lg:max-w-screen-md flex flex-col gap-5">
    {/* Post Component */}
    <div className="border rounded-md bg-white shadow-sm p-3">
      <div className="flex flex-col gap-1">
        <div>
          <User
            avatarProps={{
              src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
            }}
            name="Jane Doe"
          />
        </div>
        <p className="text-gray-700">This is the caption</p>
      </div>
      <Image
        src="https://app.requestly.io/delay/5000/https://nextui.org/images/hero-card-complete.jpeg"
        alt="Post image"
       className="rounded-md w-full max-h-[400px] lg:max-h-[600px] object-cover"
  layout="responsive"
  width={500}
  height={300}
        objectFit="cover"
        onError={() => console.log("Image failed to load")}
      />
      <div className="pt-2 flex flex-row gap-2">
        <Image
          src="/image/not-fill-heart.png"
          alt="Like icon"
          width={24}
          height={24}
          className="cursor-pointer"
        />
        <Image
              src="/image/comments.png"
              onClick={() => handleOpen("blur")}
          alt="Comments icon"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      </div>
               <Modal backdrop={backdrop} scrollBehavior={scrollBehavior} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
                  <ModalHeader className="flex flex-col gap-1">${"name Comments"}</ModalHeader>
              <ModalBody>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit dolor
                  adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. Velit duis sit
                  officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. Et mollit incididunt
                  nisi consectetur esse laborum eiusmod pariatur proident Lorem eiusmod et. Culpa
                  deserunt nostrud ad veniam.
                    </p>
                     <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit dolor
                  adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. Velit duis sit
                  officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. Et mollit incididunt
                  nisi consectetur esse laborum eiusmod pariatur proident Lorem eiusmod et. Culpa
                  deserunt nostrud ad veniam.
                    </p>

                     <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit dolor
                  adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. Velit duis sit
                  officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. Et mollit incididunt
                  nisi consectetur esse laborum eiusmod pariatur proident Lorem eiusmod et. Culpa
                  deserunt nostrud ad veniam.
                    </p>
                     <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit dolor
                  adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. Velit duis sit
                  officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. Et mollit incididunt
                  nisi consectetur esse laborum eiusmod pariatur proident Lorem eiusmod et. Culpa
                  deserunt nostrud ad veniam.
                    </p>
                     <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit dolor
                  adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. Velit duis sit
                  officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. Et mollit incididunt
                  nisi consectetur esse laborum eiusmod pariatur proident Lorem eiusmod et. Culpa
                  deserunt nostrud ad veniam.
                    </p>
                    
                  </ModalBody>
      
                <ModalFooter>
  <div className="flex w-full flex-wrap md:flex-nowrap items-center">
    <Input label="Comments" type="Comments" className="flex-1" />
    <div className="flex justify-center items-center">
      <Image 
        src="/image/commentsend.png" 
        alt="Send Comment Icon" 
        width={18} 
        height={18} 
        className="cursor-pointer"
      />
    </div>
  </div>
</ModalFooter>

            </>
          )}
        </ModalContent>
      </Modal>
        </div>

    {/* Add more posts here */}
    <div className="border rounded-md bg-white shadow-sm p-3">
      <div className="flex flex-col gap-1">
        <div>
          <User
            avatarProps={{
              src: "https://i.pravatar.cc/150?u=a04258114e29026702e",
            }}
            name="John Smith"
          />
        </div>
        <p className="text-gray-700">Another post caption</p>
      </div>
      <Image
        src="https://nextui.org/images/hero-card-complete.jpeg"
        alt="Another post image"
       className="rounded-md w-full max-h-[400px] lg:max-h-[600px] object-cover"
  layout="responsive"
  width={500}
  height={300}
        objectFit="cover"
        onError={() => console.log("Image failed to load")}
      />
      <div className="pt-2 flex flex-row gap-2">
        <Image
          src="/image/not-fill-heart.png"
          alt="Like icon"
          width={24}
          height={24}
          className="cursor-pointer"
        />
        <Image
          src="/image/comments.png"
          alt="Comments icon"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      </div>
    </div>
  </div>
</div>

  );
}
