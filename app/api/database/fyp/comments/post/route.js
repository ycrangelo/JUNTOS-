import prisma from '../../../../../../utils/connect';

export async function POST(req) {
    const {postid, userid, comment} = await req.json();

    // Validate input
    if (!postid) {
        return new Response(JSON.stringify({error: 'postid not found'}), {
            status: 400,
            headers: {'Content-Type': 'application/json'},
        });
    }
    if (!userid) {
        return new Response(JSON.stringify({error: 'userid not found'}), {
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

    try {
        // Verify if post exists
        const postExists = await prisma.post.findUnique({
            where: {id: postid},
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
                postId: postid,
                userId: userid,
                comment: comment,
            },
        });

        return new Response(JSON.stringify(newComment), {
            status: 200,
            headers: {'Content-Type': 'application/json'},
        });
    } catch (e) {
        console.error(e);
        return new Response(JSON.stringify({error: 'Internal server error'}), {
            status: 500,
            headers: {'Content-Type': 'application/json'},
        });
    }
}

// Handle OPTIONS method
export async function OPTIONS() {
    return new Response(null, {
        status: 200,
        headers: {
            Allow: 'POST',
        },
    });
}
