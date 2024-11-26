'use client';

import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';
import "@uploadthing/react/styles.css";
import axios from 'axios'; 
import { useState } from 'react';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { UploadButton } from "../../utils/uploadthing";

export default function AddPostUi({ email }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [backdrop, setBackdrop] = useState('blur');
  const [fileUrl, setFileUrl] = useState(null); 

  const createPost = async () => {
    console.log(`Creating post for ${email}`);

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/database/fyp/post`, {
        email,
        pic: fileUrl, // Ensure you're using 'pic' to match the backend
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Post created:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating post:', error.response?.data || error.message);
      throw error; 
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
                      console.log("Files: ", res);
                      setFileUrl(res[0]?.url); // Store the file URL
                    }}
                    onUploadError={(error) => {
                      alert(`ERROR! ${error.message}`);
                    }}
                  />
                )}
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
              <Button color="danger" variant="flat" onPress={() => onOpenChange(false)}>
                Close
              </Button>
              <Button color="primary" onPress={createPost}>
                Post
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}
