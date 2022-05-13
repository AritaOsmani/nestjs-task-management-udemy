import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

@Schema()
export class User extends Document {

    @Prop({ required: true, unique: true })
    username: string

    @Prop({ required: true })
    password: string

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Task' })
    tasks: string[]
}
export const UserSchema = SchemaFactory.createForClass(User)