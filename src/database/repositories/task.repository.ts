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

    async createTask(createTaskItem: CreateTaskDto): Promise<Task> {
        const newTask = new this.taskModel(createTaskItem)
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

    async getById(id: string): Promise<Task> {
        return await this.taskModel.findById({ _id: id })
    }

    async delete(taskId: string): Promise<Task> {
        await this.taskModel.deleteOne({ _id: taskId })
        return await this.getById(taskId)
    }

    async updateStatus(taskId: string, statusDto: UpdateStatusDto): Promise<Task> {
        const updated = await this.taskModel.updateOne({ _id: taskId }, { $set: { status: statusDto.status } })
        return await this.getById(taskId)
    }

    async update(taskId: string, updateTask: UpdateTaskDto): Promise<Task> {
        const found = await this.getById(taskId)
        const updated = await this.taskModel.updateOne({ _id: taskId }, { $set: { title: updateTask.title, description: updateTask.description } })
        return await this.getById(taskId)
    }
}