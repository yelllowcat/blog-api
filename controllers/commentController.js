import { prisma } from "../lib/prisma.js";

export async function createComment(req, res) {
  try {
    const { content, postId, authorId } = req.body;
    console.log("test" + content + "test");
    const comment = await prisma.comment.create({
      data: {
        content,
        post: {
          connect: {
            id: postId,
          },
        },
        author: {
          connect: {
            id: authorId,
          },
        },
      },
    });
    res.json(comment);
  } catch (err) {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    throw err;
  }
}

export async function getComment(req, res) {
  const comment = await prisma.comment.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  });
  res.json(comment);
}

export async function getAllComments(req, res) {
  const comments = await prisma.comment.findMany();
  res.json(comments);
}

export async function deleteComment(req, res) {
  const id = Number(req.params.id);
  try {
    await prisma.comment.delete({
      where: {
        id,
      },
    });
    res.status(202).send();
  } catch (err) {
    if (err) {
      return res.status(404).json({ error: "Comment not found" });
    }
    throw err;
  }
}

export async function updateComment(req, res) {
  const { content } = req.body;
  const { id } = req.params;
  const updatedComment = await prisma.comment.update({
    where: {
      id: Number(id),
    },
    data: {
      content,
    },
  });
  res.json(updatedComment);
}

export default {
  createComment,
  getComment,
  getAllComments,
  deleteComment,
  updateComment,
};
