import mongoose from "mongoose";

export enum TaskPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export enum TaskStatus {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  IN_REVIEW = "IN_REVIEW",
  DONE = "DONE",
  BLOCKED = "BLOCKED",
}

export interface ITask extends mongoose.Document {
  title: string;
  description?: string;

  priority: TaskPriority;
  status: TaskStatus;

  assigneeId?: mongoose.Types.ObjectId;

  organizationId: mongoose.Types.ObjectId;

  dueDate?: Date;
  completedAt?: Date;
}

const taskSchema = new mongoose.Schema<ITask>(
  {
    title: {
      type: String,
      required: true,
    },

    description: String,

    priority: {
      type: String,
      enum: Object.values(TaskPriority),
      default: TaskPriority.MEDIUM,
    },

    status: {
      type: String,
      enum: Object.values(TaskStatus),
      default: TaskStatus.TODO,
    },

    assigneeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },

    dueDate: Date,

    completedAt: Date,
  },
  {
    timestamps: true,
  }
);

taskSchema.index({ status: 1 });
taskSchema.index({ assigneeId: 1 });
taskSchema.index({ dueDate: 1 });

export default mongoose.model<ITask>(
  "Task",
  taskSchema
);