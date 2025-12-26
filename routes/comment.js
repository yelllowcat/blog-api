import { Router } from "express";
import commentController from "../controllers/commentController.js";

const router = Router();

router.get("/", commentController.getAllComments);

router.get("/:id", commentController.getComment);

router.post("/", commentController.createComment);

router.put("/:id", commentController.updateComment);

router.delete("/:id", commentController.deleteComment);

export default router;
