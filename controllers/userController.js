import { prisma } from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export async function createUser(req, res) {
  try {
    const { email, name } = req.body;
    const user = await prisma.user.create({
      data: {
        email,
        name,
      },
    });
    res.json(user);
  } catch (err) {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    throw err;
  }
}

export async function loginUser(req, res) {
  const { email, name } = req.body;
  const user = { email, name };
  jwt.sign(
    { user },
    process.env.SECRET_KEY,
    { expiresIn: "1h" },
    (err, token) => {
      res.json({ token });
    }
  );
}

export async function getUser(req, res) {
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  });
  res.json(user);
}

export async function getAllUsers(req, res) {
  jwt.verify(req.token, process.env.SECRET_KEY, async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const users = await prisma.user.findMany();
      res.json({ users, authData });
    }
  });
}

export async function deleteUser(req, res) {
  const id = Number(req.params.id);
  try {
    await prisma.user.delete({
      where: {
        id,
      },
    });
    res.status(202).send();
  } catch (err) {
    if (err) {
      return res.status(404).json({ error: "User not found" });
    }
    throw err;
  }
}

export async function updateUser(req, res) {
  const { email, name } = req.body;
  const { id } = req.params;
  const updatedUser = await prisma.user.update({
    where: {
      id: Number(id),
    },
    data: {
      email,
      name,
    },
  });
  res.json(updatedUser);
}

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];

    req.token = bearerToken;
    next();
  } else {
    console.log("error");
    res.sendStatus(403);
  }
}

export default {
  createUser,
  getUser,
  getAllUsers,
  deleteUser,
  updateUser,
  verifyToken,
  loginUser,
};
