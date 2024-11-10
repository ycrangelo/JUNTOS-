import prisma from '../../../../../utils/connect';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, pic } = req.body;

    try {
      // Create a new post
      const post = await prisma.post.create({
        data: {
          email,        // Email of the user creating the post
          pic,          // Picture URL (optional)
          likes: 0,     // Set likes to 0 by default
        },
      });
      return res.status(201).json(post); // Respond with the newly created post
    } catch (error) {
      console.error('Error creating post:', error);
      return res.status(500).json({ error: 'Failed to create post' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' }); // If method is not POST
  }
}
