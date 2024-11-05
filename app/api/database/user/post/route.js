import prisma from '../../../../../utils/connect';

export async function POST(req) {
    const { email, name } = await req.json();

    if (!email || !name) {
        return new Response(JSON.stringify({ error: 'Email and name are required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        const user = await prisma.user.create({
            data: {
                email,
                name,
            },
        });

        return new Response(JSON.stringify(user), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Failed to create user' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

// Optionally handle other methods
export async function OPTIONS() {
    return new Response(null, {
        status: 200,
        headers: {
            Allow: 'POST',
        },
    });
}
