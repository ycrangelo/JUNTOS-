'use client';

import { CldUploadWidget } from 'next-cloudinary';
import React, { useState } from 'react';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from '@nextui-org/react';
import axios from 'axios'; // Make sure to import axios if you are using it
import { storage } from '../firebase/clientApp';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import "@uploadthing/react/styles.css";
import { UploadButton } from "../utils/uploadthing";

export default function AddPostUi() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [backdrop, setBackdrop] = useState('blur');
  const [file, setFile] = useState(null);
//   const [filename, setFilename] = useState('');
  const [fileUrl, setFileUrl] = useState(null); // State to store the file URL

//   const handleFileChange = (event) => {
//      event.preventDefault();
//   const selectedFile = event.target.files[0];
//   if (selectedFile) {
//     setFile(selectedFile);
//     setFilename(selectedFile.name);
//     setFileUrl(URL.createObjectURL(selectedFile)); // Generate a preview URL
//     handleSubmit(selectedFile); // Pass the selected file to the submit function
//   }
// };

// // Regular expression to extract public_id from Cloudinary URL
// const getPublicIdFromUrl = (url) => {
//   const regex = /\/v\d+\/([^/]+)\.\w{3,4}$/;
//   const match = url.match(regex);
//   return match ? match[1] : null;
// };

// const handleSubmit = async (selectedFile) => {
//   if (!selectedFile) {
//     console.error("No file selected for upload.");
//     return;
//   }

//   const formData = new FormData();
//   formData.append('file', selectedFile);
//   formData.append('upload_preset', 'ml_default'); // Your Cloudinary upload preset

//   try {
//     const response = await axios.post(
//       'https://api.cloudinary.com/v1_1/dzcli35nf/image/upload',
//       formData
//     );
//     console.log(response);
    

//     // Ensure the response contains the secure_url
//     const secure_url = response.data;

//     if (!secure_url) {
//       console.error("No secure_url found in the response:", response.data);
//       return;
//     }

//     console.log("Uploaded image URL:", secure_url);

//     // You can now update your state or send this URL to your backend
//     setFileUrl(secure_url);
//   } catch (error) {
//     console.error("Error uploading image to Cloudinary:", error);
//   }
// };



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
                    {!fileUrl && (
                       <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
           setFileUrl(res[0].url);

        }}
        onUploadError={(error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
                    )
                    }
                   
                  </div>
                   {fileUrl && (
                      <img 
                        src={fileUrl} 
                        alt="Preview" 
                        className="mt-2 max-h-48 object-cover rounded-lg" 
                      />
                    )}
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={() => handleSubmit(file)}>
                    Post
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}
    // <div className="relative w-full">
    //                     <Input
    //                       type="file"
    //                       id="file-upload"
    //                       accept="image/*"
    //                     className="hidden"
    //                      onChange={handleFileChange} // Capture file on change
    //                     />
    //                     <label
    //                       htmlFor="file-upload"
    //                       className="block w-full cursor-pointer text-center border border-gray-300 rounded-lg py-2 text-gray-500 hover:bg-gray-100"
    //                     >
    //                       Choose an image
    //                     </label>
    //                 </div>

       {/* <form  onSubmit={(event) => handleSubmit(file, event)}>
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
                       <button type="submit">Upload</button>
                      </form> */}
                    {/* Display the selected file name or a preview */}
                    {/* {file && (
                      <div className="mt-2 text-sm text-gray-700">
                        Selected file: {filename}
                      </div>
                    )}
                    {fileUrl && (
                      <img 
                        src={fileUrl} 
                        alt="Preview" 
                        className="mt-2 max-h-48 object-cover rounded-lg" 
                      />
                    )} */}
