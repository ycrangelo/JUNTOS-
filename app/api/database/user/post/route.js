import prisma from '../../../../../utils/connect';

export async function POST(req) {
    const {email, name, userImage} = await req.json();

    if (!email || !name || !userImage) {
        return new Response(JSON.stringify({error: 'Email and name are required'}), {
            status: 400,
            headers: {'Content-Type': 'application/json'},
        });
    }

    try {
        // Check if a user with the given email already exists
        const existingUser = await prisma.user.findUnique({
            where: {email},
        });

        // If the user already exists, do nothing and simply return a success response
        if (existingUser) {
            // You can return a message indicating the user exists, or just a success message.
            return new Response(JSON.stringify({message: 'User already exists'}), {
                status: 200,
                headers: {'Content-Type': 'application/json'},
            });
        }

        // If the user does not exist, create the new user
        const user = await prisma.user.create({
            data: {
                email,
                name,
                userImage
            },
        });

        return new Response(JSON.stringify(user), {
            status: 201,
            headers: {'Content-Type': 'application/json'},
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({error: 'Failed to create user'}), {
            status: 500,
            headers: {'Content-Type': 'application/json'},
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
