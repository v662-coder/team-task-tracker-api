import Task, {
  TaskStatus,
} from "../models/Task";

import { canMoveTo } from "../utils/statusTransition";

export class TaskService {
  async createTask(data: any) {
    return await Task.create(data);
  }

  async getTasks(
    query: any,
    user: any
  ) {
    const page =
      Number(query.page) || 1;

    const limit =
      Number(query.limit) || 10;

    const skip =
      (page - 1) * limit;

    const filter: any = {
      organizationId:
        user.organizationId,
    };

    if (query.status) {
      filter.status =
        query.status;
    }

    if (query.priority) {
      filter.priority =
        query.priority;
    }

    if (query.assigneeId) {
      filter.assigneeId =
        query.assigneeId;
    }

    if (user.role === "MEMBER") {
      filter.assigneeId =
        user.userId;
    }

    const tasks =
      await Task.find(filter)
        .skip(skip)
        .limit(limit)
        .sort({
          createdAt: -1,
        });

    const total =
      await Task.countDocuments(
        filter
      );

    return {
      tasks,
      page,
      limit,
      total,
    };
  }

  async getTaskById(id: string) {
    return await Task.findById(id);
  }

  async updateTask(
    id: string,
    data: any
  ) {
    return await Task.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
      }
    );
  }

  async deleteTask(id: string) {
    return await Task.findByIdAndDelete(
      id
    );
  }

  async updateStatus(
    taskId: string,
    status: TaskStatus,
    user: any
  ) {
    const task =
      await Task.findById(taskId);

    if (!task) {
      throw new Error(
        "Task not found"
      );
    }

    const isManager =
      user.role === "MANAGER";

    const isAdmin =
      user.role === "ADMIN";

    const isAssignee =
      task.assigneeId?.toString() ===
      user.userId;

    if (
      !isManager &&
      !isAdmin &&
      !isAssignee
    ) {
      throw new Error(
        "Not allowed"
      );
    }

    const allowed =
      canMoveTo(
        task.status,
        status
      );

    if (!allowed) {
      throw new Error(
        "Invalid status transition"
      );
    }

    task.status = status;

    if (status === "DONE") {
      task.completedAt =
        new Date();
    }

    await task.save();

    return task;
  }
}

export const taskService =
  new TaskService();