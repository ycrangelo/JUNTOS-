import prisma from '../../../../../../utils/connect';

export async function POST(req) {
    const {postid, userid, comment} = await req.json()

    if (!postid) {
        return new Response(JSON.stringify({error: 'postid not found'}), {
            status: 400,
            headers: {'Content-Type': 'application/json'},
        })
    }
    if (!userid) {
        return new Response(JSON.stringify({error: 'userid not found'}), {
            status: 400,
            headers: {'Content-Type': 'application/json'},
        })
    }
    if (!comment) {
        return new Response(JSON.stringify({error: 'comment not found'}), {
            status: 400,
            headers: {'Content-Type': 'application/json'},
        })
    }

    try {
        const postID = await prisma.post.findUnique({
            where: {id: postid}
        })
        if (!postID) {
            return res.status(404).json({error: 'Post not found.'});
        }

        //creating a new comment
        const createComment = await prisma.comments.create({
            postid,
            userid,
            comment,
        })
        return new Response(JSON.Stringify(createComment), {
            status: 200,
            headers: {'Content-Type': 'application/json'},

        });
    } catch (e) {
        console.error(e)
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
