import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { TaskStatus } from "src/modules/tasks/tasks.model";

@Schema()
export class Task extends Document {
    @Prop({ required: true, unique: true })
    title: string

    @Prop()
    description: string

    @Prop({ default: TaskStatus.OPEN })
    status: string

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: string
}
export const TaskSchema = SchemaFactory.createForClass(Task)