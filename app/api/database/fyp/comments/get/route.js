import prisma from '../../../../../../utils/connect';

export async function GET(req) {
    try {
        // Extract `postId` from query parameters
        const url = new URL(req.url);
        const postId = url.searchParams.get('postId');
        console.log('Post ID received for fetching comments:', postId);

        // Validate `postId`
        if (!postId) {
            return new Response(
                JSON.stringify({error: 'postId is required'}),
                {
                    status: 400,
                    headers: {'content-type': 'application/json'},
                }
            );
        }

        const comments = await prisma.comments.findMany({
            where: {postId: postId},
        });
        console.log('Comments fetched from database:', comments);

        return new Response(
            JSON.stringify(comments),
            {
                status: 200,
                headers: {'content-type': 'application/json'},
            }
        );
    } catch (e) {
        console.error('Error fetching comments:', e);

        return new Response(
            JSON.stringify({error: 'Internal server error'}),
            {
                status: 500,
                headers: {'content-type': 'application/json'},
            }
        );
    }
}

// Optionally handle OPTIONS
export async function OPTIONS() {
    return new Response(null, {
        status: 200,
        headers: {
            Allow: 'GET',
        },
    });
}
