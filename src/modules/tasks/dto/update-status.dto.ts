import { IsEnum, IsString } from "class-validator";
import { TaskStatus } from "../tasks.model";

export class UpdateStatusDto {
    @IsEnum(TaskStatus)
    @IsString()
    status: TaskStatus
}