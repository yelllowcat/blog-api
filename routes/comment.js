import { Router } from "express";
import commentController from "../controllers/commentController.js";
import userController from "../controllers/userController.js";

const router = Router();

router.get("/", commentController.getAllComments);

router.get("/:id", commentController.getComment);

router.post("/", userController.verifyToken, commentController.createComment);

router.put("/:id", commentController.updateComment);

router.delete("/:id", commentController.deleteComment);

export default router;
