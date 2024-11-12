'use client'

import React, { useState } from 'react'
import { IoMdAddCircleOutline } from "react-icons/io"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import { storage } from '../firebase/clientApp';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function AddPostUi() {
 const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [backdrop, setBackdrop] = useState('blur')
   const [file, setFile] = useState(null);  // State to store the file
  const [fileUrl, setFileUrl] = useState(null); // State to store the file URL

   const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileUrl(URL.createObjectURL(selectedFile));  // Generate a preview URL
    }
   };
  
   const uploadImageToFirebase = async () => {
    if (!file) return;

     const storageRef = ref(storage, `images/${file.name}`);
     
    try {
      // Upload file to Firebase Storage
      await uploadBytes(storageRef, file);
      // Get the file's download URL
      const downloadURL = await getDownloadURL(storageRef);
      setFileUrl(downloadURL);
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    } 
  };
 
  return (
    <div className='fixed bottom-0 left-0 w-full border-t bg-white'>
      <div className='flex justify-center items-center py-4'>
        <Button onPress={onOpen} isIconOnly color="warning" variant="flat" size="lg" aria-label="Take a photo">
          <IoMdAddCircleOutline size='2rem' />
        </Button>
        <Modal 
          isOpen={isOpen} 
          onOpenChange={onOpenChange}
          placement="center"
          backdrop={backdrop}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">New Post</ModalHeader>
                <ModalBody>
                  <Input
                    autoFocus
                    label="Caption"
                    placeholder="Enter a caption for your photo"
                    variant="bordered"
                  />
                 <div className="mt-4">
                      <div className="relative w-full">
                        <Input 
                          type="file" 
                          id="file-upload" 
                          accept="image/*" 
                        className="hidden" 
                         onChange={handleFileChange} // Capture file on change
                        />
                        <label 
                          htmlFor="file-upload" 
                          className="block w-full cursor-pointer text-center border border-gray-300 rounded-lg py-2 text-gray-500 hover:bg-gray-100"
                        >
                          Choose an image
                        </label>
                    </div>
                      {/* Display the selected file name or a preview */}
                    {file && (
                      <div className="mt-2 text-sm text-gray-700">
                        Selected file: {file.name}
                      </div>
                    )}
                    {fileUrl && (
                      <img src={fileUrl} alt="Preview" className="mt-2 max-h-48 object-cover rounded-lg" />
                    )}
                    </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                  <Button onPress={uploadImageToFirebase}  color="primary">
                    Post
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  )
}
