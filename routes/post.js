import { Router } from "express";
import postController from "../controllers/postController.js";
import userController from "../controllers/userController.js";
const router = Router();

router.get("/", postController.getAllPosts);

router.get("/:id", userController.verifyToken, postController.getPost);

router.post("/", userController.verifyToken, postController.createPost);

router.put("/:id", userController.verifyToken, postController.updatePost);

router.delete("/:id", userController.verifyToken, postController.deletePost);

export default router;
