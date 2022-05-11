import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { isValidObjectId } from "mongoose";

export class CheckIdPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if (!isValidObjectId(value)) {
            throw new BadRequestException('Invalid id type provided!')
        }
        return value
    }
}