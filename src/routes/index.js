import { Router } from "express";
// import { login, register } from "../controllers/user.controller";
import { login, register } from "../controllers/user.controller.js";
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask,
} from "../controllers/task.controller.js";
import { protect } from "../middleware/index.js";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "API is running" });
});

router.post("/auth/register", register);

router.post("/auth/login", login);

router.post("/tasks", protect, createTask);

router.get("/tasks", protect, getTasks);

router.put("/tasks/:id", protect, updateTask);
router.delete("/tasks/:id", protect, deleteTask);

router.get("/tasks/:id", protect, getTaskById);

export default router;
