import prisma from '../../../../../../utils/connect'

export async function GET(req, res) {

    const {postId} = req.json();//ge the userID

    try {
        if (postId) {
            return new Response(
                JSON.stringify({error: 'userid is req'}),
                {
                    status: 400,
                    headers: {'content-type': 'application/json'},
                }
            )
        }
        const comments = await prisma.comment.findMany({
            where: {postId: postId}
        })

        return new Response(
            JSON.stringify((comments), {
                status: 200,
                headers: {'content-type': 'application/json'},
            })
        )
    } catch (e) {
        console.log('fetching in error', e)

        return new Response(
            JSON.stringify({error: e}, {
                status: 500,
                headers: {'content-type': 'application/json'},
            })
        )
    }
}

// Optionally handle other methods
export async function OPTIONS() {
    return new Response(null, {
        status: 200,
        headers: {
            Allow: 'GET',
        },
    });
}
