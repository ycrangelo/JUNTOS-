'use client'


import React, { useState } from 'react'
import { IoMdAddCircleOutline } from "react-icons/io"
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";

export default function AddPostUi() {
 const { isOpen, onOpen, onOpenChange } = useDisclosure();
 const [backdrop, setBackdrop] = React.useState('blur')
 
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
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  // endContent={
                  
                  // }
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                />
                <Input
                  // endContent={
                   
                  // }
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  variant="bordered"
                />
                <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    classNames={{
                      label: "text-small",
                    }}
                  >
                    Remember me
                  </Checkbox>
                  <Link color="primary" href="#" size="sm">
                    Forgot password?
                  </Link>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Sign in
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
