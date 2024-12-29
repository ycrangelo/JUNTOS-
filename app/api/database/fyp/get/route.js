import prisma from '../../../../../utils/connect';

export async function GET(req) {
    try {
        // Retrieve all posts from the database
        const posts = await prisma.post.findMany();

        return new Response(JSON.stringify(posts), {
            status: 200,
            headers: {'Content-Type': 'application/json'},
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({error: 'Failed to retrieve posts'}), {
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
            Allow: 'GET, POST',
        },
    });
}