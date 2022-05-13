import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateTaskDto } from "src/modules/tasks/dto/create-task.dto";
import { TaskFiltersDto } from "src/modules/tasks/dto/task-filters.dto";
import { UpdateStatusDto } from "src/modules/tasks/dto/update-status.dto";
import { UpdateTaskDto } from "src/modules/tasks/dto/update-task.dto";
import { Task } from "../entities/task.entity";

@Injectable()
export class TaskRepository {
    constructor(@InjectModel(Task.name) private taskModel: Model<Task>) { }

    async createTask(createTaskItem: CreateTaskDto, userId: string): Promise<Task> {
        const { title, description } = createTaskItem
        const newTask = new this.taskModel({ title, description, user: userId })
        return await newTask.save()
    }

    async getAll(filterDto: TaskFiltersDto): Promise<Task[]> {
        const { status, search } = filterDto
        if (status) {
            return await this.taskModel.find({ status: status })
        }

        if (search) {
            console.log('inside search')
            //query not working
            return await this.taskModel.find({ $or: [{ title: /search/ }, { description: /search/ }] })
            // return await this.taskModel.aggregate([{ $match: { title: search } }])
        }
        return await this.taskModel.find()
    }

    async getById(id: string, userId: string): Promise<Task> {
        return await this.taskModel.findOne({ $and: [{ _id: id }, { user: userId }] })
    }

    async delete(taskId: string, userId: string): Promise<Task> {
        await this.taskModel.deleteOne({ _id: taskId, user: userId })
        return await this.getById(taskId, userId)
    }

    async updateStatus(taskId: string, statusDto: UpdateStatusDto, userId: string): Promise<Task> {
        const updated = await this.taskModel.updateOne({ _id: taskId, user: userId }, { $set: { status: statusDto.status } })
        return await this.getById(taskId, userId)
    }

    async update(taskId: string, updateTask: UpdateTaskDto): Promise<Task> {
        // const found = await this.getById(taskId)
        const found = await this.taskModel.findById(taskId)
        const updated = await this.taskModel.updateOne({ _id: taskId }, { $set: { title: updateTask.title, description: updateTask.description } })
        return await this.taskModel.findById(taskId)
    }
}