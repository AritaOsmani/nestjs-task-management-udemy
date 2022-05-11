import { IsEnum, IsOptional, IsString } from "class-validator"
import { TaskStatus } from "../tasks.model"

export class TaskFiltersDto {

    @IsOptional()
    @IsEnum(TaskStatus)
    readonly status?: TaskStatus

    @IsString()
    @IsOptional()
    readonly search?: string
}