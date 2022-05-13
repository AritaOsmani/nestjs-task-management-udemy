import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { v4 as uuid } from 'uuid'
import { UpdateStatusDto } from "./dto/update-status.dto";
import { TaskFiltersDto } from "./dto/task-filters.dto";
import { TaskRepository } from "src/database/repositories/task.repository";
import { Task } from "src/database/entities/task.entity";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { use } from "passport";
import { UserRepository } from "src/database/repositories/user.repository";

@Injectable()
export class TasksService {

    constructor(private taskRepository: TaskRepository, private userRepository: UserRepository) { }


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

    async getTaskById(id: string, userId: string): Promise<Task> {
        const match = await this.taskRepository.getById(id, userId)
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


    async createTask(newTask: CreateTaskDto, userId: string): Promise<Task> {
        //check if the user with the given id exists:
        const foundUser = await this.userRepository.getById(userId)
        if (foundUser) {
            return await this.taskRepository.createTask(newTask, userId)
        } else {
            throw new NotFoundException('User with given id not found!')
        }
    }

    async deleteTask(id: string, userId: string): Promise<Task> {
        const match = await this.taskRepository.getById(id, userId)
        const user = await this.userRepository.getById(userId)
        console.log('user: ', user)
        console.log('match: ', match)
        if (match) {

            return await this.taskRepository.delete(id, userId)
        } else {
            throw new NotFoundException(`Task with given id: ${id} not found or user id provided is wrong`)
        }
    }

    async updateStatus(taskId: string, status: UpdateStatusDto, userId: string): Promise<Task> {
        const match = await this.taskRepository.getById(taskId, userId)
        if (match) {
            return await this.taskRepository.updateStatus(taskId, status, userId)
        } else {
            throw new NotFoundException(`Task with given id: ${taskId} not found or user not authorized`)
        }
    }

    //*
    async updateTask(taskId: string, updateTaskDto: UpdateTaskDto, userId): Promise<Task> {
        const match = await this.taskRepository.getById(taskId, userId)
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