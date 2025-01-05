import prisma from '../../../../../utils/connect';

export async function GET(req) {
    try {
        // Assuming user ID is retrieved from session or query parameter
        const userId = req.headers.get('user-id'); // Replace with your auth mechanism

        if (!userId) {
            return new Response(
                JSON.stringify({error: 'User ID is required'}),
                {
                    status: 400,
                    headers: {'content-type': 'application/json'},
                }
            );
        }

        const likedPosts = await prisma.like.findMany({
            where: {userId},
            include: {post: true}, // Include post details
        });

        return new Response(
            JSON.stringify(likedPosts.map((like) => like.post)), // Return only posts
            {
                status: 200,
                headers: {'content-type': 'application/json'},
            }
        );
    } catch (error) {
        console.error('Error fetching liked posts:', error);

        return new Response(
            JSON.stringify({error: 'An error occurred while fetching liked posts'}),
            {
                status: 500,
                headers: {'content-type': 'application/json'},
            }
        );
    }
}
