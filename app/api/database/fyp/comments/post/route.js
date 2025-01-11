import prisma from '../../../../../../utils/connect';

export async function POST(req) {
    try {
        const {postId, userName, userImage, comment} = await req.json();

        // Validate input
        if (!postId) {
            return new Response(JSON.stringify({error: 'postId not found'}), {
                status: 400,
                headers: {'Content-Type': 'application/json'},
            });
        }
        if (!userName) {
            return new Response(JSON.stringify({error: 'userName not found'}), {
                status: 400,
                headers: {'Content-Type': 'application/json'},
            });
        }
        if (!comment) {
            return new Response(JSON.stringify({error: 'comment not found'}), {
                status: 400,
                headers: {'Content-Type': 'application/json'},
            });
        }

        // Verify if post exists
        const postExists = await prisma.post.findUnique({
            where: {id: postId},
        });
        if (!postExists) {
            return new Response(JSON.stringify({error: 'Post not found'}), {
                status: 404,
                headers: {'Content-Type': 'application/json'},
            });
        }

        // Create a new comment
        const newComment = await prisma.comments.create({
            data: {
                postId,
                userName,
                userImage,
                comment
            },
        });

        return new Response(JSON.stringify(newComment), {
            status: 200,
            headers: {'Content-Type': 'application/json'},
        });
    } catch (error) {
        console.error("Internal server error:", error);
        return new Response(JSON.stringify({error: 'Internal server error'}), {
            status: 500,
            headers: {'Content-Type': 'application/json'},
        });
    }
}

export async function OPTIONS() {
    return new Response(null, {
        status: 200,
        headers: {
            Allow: 'POST, OPTIONS',
        },
    });
}
