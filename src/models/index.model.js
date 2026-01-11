import mongoose from "mongoose";

const Users = mongoose.model(
  "Users",
  new mongoose.Schema(
    {
      name: String,
      email: String,
      password: String,
    },
    { timestamps: true }
  )
);

const Tasks = mongoose.model(
  "Tasks",
  new mongoose.Schema(
    {
      title: String,
      description: String,
      status: {
        type: String,
        enum: ["pending", "in-progress", "completed"],
        default: "pending",
      },
      assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    },
    { timestamps: true }
  )
);

export { Users, Tasks };
