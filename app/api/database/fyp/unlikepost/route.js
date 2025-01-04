import prisma from '../../../../../utils/connect';

// Handle the POST request to like a post
export async function POST(req) {
    try {
        // Parse the request body to extract postId
        const {postId} = await req.json();

        if (!postId) {
            return new Response(
                JSON.stringify({error: 'Post ID is required'}),
                {
                    status: 400,
                    headers: {'content-type': 'application/json'},
                }
            );
        }

        // Check if the post exists
        const post = await prisma.post.findUnique({
            where: {id: postId},
        });

        if (!post) {
            return new Response(
                JSON.stringify({error: 'Invalid post ID'}),
                {
                    status: 404,
                    headers: {'content-type': 'application/json'},
                }
            );
        }

        // Increment the like count for the post
        const updatedPost = await prisma.post.update({
            where: {id: postId},
            data: {
                likes: post.likes - 1, // Increment the like count
            },
        });

        return new Response(
            JSON.stringify({
                message: 'Post liked successfully!',
                post: updatedPost,
            }),
            {
                status: 200,
                headers: {'content-type': 'application/json'},
            }
        );
    } catch (error) {
        console.error('Error liking the post:', error);

        return new Response(
            JSON.stringify({
                error: 'An error occurred while liking the post',
            }),
            {
                status: 500,
                headers: {'content-type': 'application/json'},
            }
        );
    }
}

// Handle OPTIONS method
export async function OPTIONS() {
    return new Response(null, {
        status: 200,
        headers: {
            allow: 'POST',
        },
    });
}
