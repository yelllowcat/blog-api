import { prisma } from "../lib/prisma.js";

export async function createPost(req, res) {
  try {
    const { title, content, author } = req.body;
    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId: Number(author),
      },
    });
    res.json(post);
  } catch (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    throw err;
  }
}

export async function getPost(req, res) {
  const post = await prisma.post.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  });
  res.json(post);
}

export async function getAllPosts(req, res) {
  const post = await prisma.post.findMany({
    include: {
      author: true,
      comments: {
        include: {
          author: true,
        },
      },
    },
  });
  res.json(post);
}

export async function deletePost(req, res) {
  const id = Number(req.params.id);
  try {
    await prisma.post.delete({
      where: {
        id,
      },
    });
    res.status(202).send();
  } catch (err) {
    if (err) {
      return res.status(404).json({ error: "Post not found" });
    }
    throw err;
  }
}

export async function updatePost(req, res) {
  const { title, content } = req.body;
  const { id } = req.params;
  const updatedPost = await prisma.post.update({
    where: {
      id: Number(id),
    },
    data: {
      title,
      content,
    },
  });
  res.json(updatedPost);
}

export default {
  createPost,
  getPost,
  getAllPosts,
  deletePost,
  updatePost,
};
