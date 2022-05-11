import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Task, TaskSchema } from "src/database/entities/task.entity";
import { TaskRepository } from "src/database/repositories/task.repository";
import { TasksController } from "./tasks.controller";
import { TasksService } from "./tasks.service";


@Module({
    imports: [MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }])],
    providers: [TasksService, TaskRepository],
    controllers: [TasksController]
})
export class TasksModule { }