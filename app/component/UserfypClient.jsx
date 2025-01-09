'use client';

import {useEffect, useState} from "react";
import {User, Input} from "@nextui-org/react";
import {Image} from "@nextui-org/react";
import axios from "axios";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
} from "@nextui-org/react";

export default function UserfypClient() {
    const [windowWidth, setWindowWidth] = useState(null);
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [scrollBehavior, setScrollBehavior] = useState("inside");
    const [backdrop, setBackdrop] = useState("blur");
    const [posts, setPosts] = useState([]);

    // Function to fetch posts
    const fetchPosts = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/database/fyp/get/`
            );
            const fetchedPosts = response.data;

            setPosts((prevPosts) => {
                const existingIds = new Set(prevPosts.map((post) => post.id));
                const newUniquePosts = fetchedPosts.filter((post) => !existingIds.has(post.id));
                return [...prevPosts, ...newUniquePosts];
            });
        } catch (error) {
            console.error(
                "Error fetching posts:",
                error.response ? error.response.data : error.message
            );
        }
    };
    // const handleLikePost = async (postId) => {
    //     try {
    //         await axios.post(
    //             `${process.env.NEXT_PUBLIC_BASE_URL}/api/database/fyp/likepost/`,
    //             {postId}
    //         );
    //         console.log(`Post ${postId} liked!`);
    //         await fetchPosts(); // Fetch the updated posts after liking
    //     } catch (error) {
    //         console.error(
    //             "Error liking the post:",
    //             error.response ? error.response.data : error.message
    //         );
    //     }
    // };

    useEffect(() => {
        fetchPosts();

        // const intervalId = setInterval(() => {
        //     fetchPosts();
        //     console.log(" polling")
        // }, 5000); // Poll every 6 seconds

        const handleResize = () => setWindowWidth(window.innerWidth);
        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            // clearInterval(intervalId);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    if (windowWidth === null) return null;

    const handleOpen = (backdrop) => {
        setBackdrop(backdrop);
        onOpen();
    };

    const isMobile = windowWidth <= 768;

    return (
        <div className="flex flex-col items-center min-h-screen mb-[6rem]">
            <div className="w-full max-w-screen-sm lg:max-w-screen-md flex flex-col gap-5">
                {posts.slice().reverse().map((post) => (
                    <div key={post.id} className="border rounded-md bg-white shadow-sm p-3">
                        <div className="flex flex-col gap-1">
                            <div>
                                <User
                                    avatarProps={{
                                        src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                                    }}
                                    name={post.email || "Anonymous"}
                                />
                            </div>
                            <p className="text-gray-700">
                                {post.caption || "No caption provided"}
                            </p>
                        </div>
                        {post.pic ? (
                            <Image
                                src={post.pic}
                                alt="Post image"
                                className="rounded-md w-full max-h-[400px] lg:max-h-[600px] object-cover"
                                layout="responsive"
                                width={500}
                                height={300}
                                objectFit="cover"
                                onError={() => console.log("Image failed to load")}
                            />
                        ) : (
                            <p className="text-gray-500 italic">No image available</p>
                        )}
                        <div className="pt-2 flex flex-row gap-2 items-center">
                            <p>{post.likes}</p>
                            <Image
                                src="/image/not-fill-heart.png"
                                alt="Like icon"
                                width={24}
                                height={24}
                                className="cursor-pointer"
                                // onClick={handleLikePost(post.id)}
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
                    </div>
                ))}
            </div>

            <Modal
                backdrop={backdrop}
                scrollBehavior={scrollBehavior}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                {"Comments"}
                            </ModalHeader>
                            <ModalBody>
                                //
                            </ModalBody>
                            <ModalFooter>
                                <div className="flex w-full flex-wrap md:flex-nowrap items-center">
                                    <Input
                                        label="Comments"
                                        type="text"
                                        className="flex-1"
                                        placeholder="Write your comment"
                                    />
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
    );
}
