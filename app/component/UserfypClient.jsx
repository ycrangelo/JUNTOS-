'use client';

// do the likes POST and GET, also the UI of those
//fix mo muna pala yung bug sa comment, ayaw mag comment sa iba

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


export default function UserfypClient({userImage, userName}) {
    const [windowWidth, setWindowWidth] = useState(null);
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [scrollBehavior, setScrollBehavior] = useState("inside");
    const [backdrop, setBackdrop] = useState("blur");
    const [posts, setPosts] = useState([]);
    const [getComment, getSetComments] = useState([]);
    const [postComment, postSetComments] = useState("");
    const [showToast, setShowToast] = useState(false); // State for toast


    const handleInputChange = (e) => {
        postSetComments(e.target.value);
    };

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

    //display the comments
    //dito ka tingin
    const fetchComments = async (postId) => {
        try {
            console.log(postId)
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/database/fyp/comments/get`,
                {
                    params: {postId},
                }
            );

            getSetComments(response.data);
            console.log('These are the comments:', response.data);

        } catch (e) {
            console.error('Error fetching comments:', e);
        }
    };

    //handle the POST req
    //nagana na to
    const handlePostComment = async (postId) => {
        try {

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/database/fyp/comments/post`,
                {
                    postId,
                    userName,
                    userImage,
                    comment: postComment, // Ensure key matches backend expectations
                }
            );
            if (response) {
                setShowToast(true); // Show toast on success


            }

            setTimeout(() => setShowToast(false), 3000); // Hide after 3 seconds


        } catch (error) {
            console.error("Error submitting comment:", error.response?.data || error.message);
            alert("Pleast write a comment")
        }
        postSetComments(""); // Clear input after posting
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

        const intervalId = setInterval(() => {
            fetchPosts();
            console.log(" polling")
        }, 5000); // Poll every 6 seconds

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
        <div className="flex flex-col items-center min-h-screen mb-[4rem] mt-[2rem]">
            <div className="w-full max-w-screen-sm lg:max-w-screen-md flex flex-col gap-5">
                {/* Toast Notification */}
                {showToast && (
                    <div
                        className="absolute top-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-md transition-opacity duration-300">
                        Comment posted successfully!
                    </div>
                )}
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
                                onClick={() => {
                                    handleOpen("blur");
                                    fetchComments(post.id);
                                }}
                                alt="Comments icon"
                                width={24}
                                height={24}
                                className="cursor-pointer"
                            />
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
                                            <div className="flex flex-col gap-2">
                                                {getComment.length > 0 ? (
                                                    getComment
                                                        .slice()
                                                        .reverse()
                                                        .map((comment) => (
                                                            <div
                                                                key={comment.id}

                                                                className="flex verflow-y-scroll items-center justify-between gap-2 border-y-1 p-2"
                                                            >
                                                                <div className="flex items-center gap-2">
                                                                    <User
                                                                        avatarProps={{
                                                                            src: comment.userImage,
                                                                        }}
                                                                        name={
                                                                            <strong>{comment.userName || "Anonymous"}</strong>}
                                                                    />
                                                                    <p className="text-gray-700 break-all  whitespace-normal max-w-full">{comment.comment}</p>
                                                                </div>
                                                                <p className="text-gray-500 text-[.6rem]">
                                                                    {new Intl.DateTimeFormat('en-US', {
                                                                        month: 'long',
                                                                        day: 'numeric',
                                                                    }).format(new Date(comment.updatedAt))}
                                                                </p>
                                                            </div>
                                                        ))
                                                ) : (
                                                    <p className="text-gray-500 italic">No comments yet. be the
                                                        first!</p>
                                                )}
                                            </div>
                                        </ModalBody>
                                        <ModalFooter>
                                            <div className="flex w-full  flex-wrap md:flex-nowrap items-center">
                                                <input
                                                    value={postComment}
                                                    onChange={handleInputChange} // Pass the event directly
                                                    type="text"
                                                    placeholder="Write your comment here..."
                                                    className="flex-1 border rounded px-2 py-1"
                                                />
                                                <div
                                                    onClick={() => {
                                                        handlePostComment(post.id).then(
                                                            onClose()
                                                        )

                                                    }}

                                                    className="flex justify-center items-center cursor-pointer"
                                                >
                                                    <img
                                                        src="/image/commentsend.png"
                                                        alt="Send Comment Icon"
                                                        width={18}
                                                        height={18}
                                                    />
                                                </div>
                                            </div>
                                        </ModalFooter>
                                    </>
                                )}
                            </ModalContent>
                        </Modal>
                    </div>
                ))}
            </div>
        </div>
    );
}
