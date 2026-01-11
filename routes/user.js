import { Router } from "express";
import userController from "../controllers/userController.js";
const router = Router();

router.get("/", userController.verifyToken, userController.getAllUsers);

router.get("/:id", userController.verifyToken, userController.getUser);

router.post("/login", userController.loginUser);

router.post("/logout", userController.logout);

router.post("/", userController.createUser);

router.put("/:id", userController.verifyToken, userController.updateUser);

router.delete("/:id", userController.verifyToken, userController.deleteUser);

export default router;
