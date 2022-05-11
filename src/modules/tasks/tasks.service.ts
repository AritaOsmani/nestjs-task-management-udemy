import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { v4 as uuid } from 'uuid'
import { UpdateStatusDto } from "./dto/update-status.dto";
import { TaskFiltersDto } from "./dto/task-filters.dto";
import { TaskRepository } from "src/database/repositories/task.repository";
import { Task } from "src/database/entities/task.entity";
import { UpdateTaskDto } from "./dto/update-task.dto";

@Injectable()
export class TasksService {

    constructor(private taskRepository: TaskRepository) { }


    async getAllTasks(filterDto: TaskFiltersDto): Promise<Task[]> {
        return this.taskRepository.getAll(filterDto)
    }

    // getTaskById(id: string): Task {
    //     const match = this.tasks.find(task => task.id === id)
    //     if (!match) {
    //         throw new NotFoundException(`Task with id ${id} not found!`)
    //     }
    //     return match
    // }

    async getTaskById(id: string): Promise<Task> {
        const match = await this.taskRepository.getById(id)
        if (match) {
            return match
        } else {
            throw new NotFoundException(`The user with given id: ${id} not found! `)
        }
    }

    // getTaskByFilters(filterDto: TaskFiltersDto): Task[] {
    //     const { status, search } = filterDto
    //     let tasks = this.tasks
    //     if (status) {
    //         tasks = tasks.filter(task => task.status === status)
    //     }

    //     if (search) {
    //         tasks = tasks.filter(task => {
    //             if (task.title.includes(search) || task.description.includes(search)) {
    //                 return true
    //             } else {
    //                 return false
    //             }
    //         })
    //     }

    //     return tasks
    // }


    async createTask(newTask: CreateTaskDto): Promise<Task> {
        return await this.taskRepository.createTask(newTask)
    }

    async deleteTask(id: string): Promise<Task> {
        const match = await this.taskRepository.getById(id)
        if (match) {
            return await this.taskRepository.delete(id)
        } else {
            throw new NotFoundException(`Task with given id: ${id} not found!`)
        }
    }

    async updateStatus(taskId: string, status: UpdateStatusDto): Promise<Task> {
        const match = await this.taskRepository.getById(taskId)
        if (match) {
            return await this.taskRepository.updateStatus(taskId, status)
        } else {
            throw new NotFoundException(`Task with given id: ${taskId} not found!`)
        }
    }

    async updateTask(taskId: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
        const match = await this.taskRepository.getById(taskId)
        if (match) {
            if (updateTaskDto.title && match.title === updateTaskDto.title) {
                throw new ConflictException('This task title is already in use')
            }

            return await this.taskRepository.update(taskId, updateTaskDto)

        } else {
            throw new NotFoundException(`Task with given id: ${taskId} not found!`)
        }
    }

}