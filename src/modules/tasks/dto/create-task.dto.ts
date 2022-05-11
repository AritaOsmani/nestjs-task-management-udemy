import { IsEnum, IsNotEmpty } from "class-validator"
import { TaskStatus } from "../tasks.model"

export class CreateTaskDto {

    @IsNotEmpty()
    readonly title: string

    @IsNotEmpty()
    readonly description: string

}