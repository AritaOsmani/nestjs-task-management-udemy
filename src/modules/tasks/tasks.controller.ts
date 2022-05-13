import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Query, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Task } from "src/database/entities/task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskFiltersDto } from "./dto/task-filters.dto";
import { UpdateStatusDto } from "./dto/update-status.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { CheckIdPipe } from "./pipes/check_id.pipe";
import { TasksService } from "./tasks.service";

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private taskService: TasksService) { }

    // @Get()
    // getTasks(@Query() filterDto: TaskFiltersDto): Task[] {
    //     console.log('filterDto: ', filterDto)
    //     if (Object.keys(filterDto).length) {
    //         return this.taskService.getTaskByFilters(filterDto)
    //     } else {
    //         return this.taskService.getAll()
    //     }
    // }



    @Get()
    async getAllTasks(@Query() filterDto: TaskFiltersDto): Promise<Task[]> {
        return this.taskService.getAllTasks(filterDto)
    }

    @Get(':id')
    async getTaskById(@Param('id', CheckIdPipe) id: string, @Req() req) {
        console.log('req:', req.user)
        return this.taskService.getTaskById(id, req.user._id)
    }

    @Post()
    async createTask(@Body() createTaskDto: CreateTaskDto, @Req() req): Promise<Task> {
        return await this.taskService.createTask(createTaskDto, req.user._id)
    }

    @Delete(':id')
    async deleteTask(@Param('id', CheckIdPipe) id: string, @Req() req): Promise<Task> {
        return await this.taskService.deleteTask(id, req.user._id)
    }

    @Patch('/:id/status')
    async updateTaskStatus(@Param('id', CheckIdPipe) id: string, @Body() statusInput: UpdateStatusDto, @Req() req): Promise<Task> {
        return await this.taskService.updateStatus(id, statusInput, req.user._id)
    }

    @Patch(':id')
    async updateTask(@Param('id', CheckIdPipe) id: string, @Body() updateTaskDto: UpdateTaskDto, @Req() req): Promise<Task> {
        console.log(updateTaskDto)
        return await this.taskService.updateTask(id, updateTaskDto, req.user._id)
    }

}