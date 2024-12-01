import prisma from '../../../../../utils/connect';

export async function POST(req) {
    const { email, pic,caption } = await req.json();

    if (!email) {
        return new Response(JSON.stringify({ error: 'Email is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        // Create a new post
        const post = await prisma.post.create({
            data: {
                email,
                pic, // Optional field, can be null
                caption,
            },
        });

        return new Response(JSON.stringify(post), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Failed to create post' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
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
