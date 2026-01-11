import { Tasks } from "../models/index.model.js";

const createTask = async (req, res) => {
  const { title, description, status } = req.body;
  try {
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }

    const newTask = new Tasks({
      title,
      description,
      status,
    });
    await newTask.save();
    res.status(201).json({ message: "Task created successfully", newTask });
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Tasks.find().populate("assignedTo", "name email");
    if (tasks.length === 0) {
      return res.status(404).json({ message: "No tasks found" });
    }
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving tasks", error });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  try {
    const task = await Tasks.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;

    await task.save();
    res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Tasks.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
};

const getTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Tasks.findById(id).populate("assignedTo", "name email");
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving task", error });
  }
};

export { createTask, getTasks, updateTask, deleteTask, getTaskById };
