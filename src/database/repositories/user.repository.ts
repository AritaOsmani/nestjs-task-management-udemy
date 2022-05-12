import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AuthCredentialsDto } from "src/modules/auth/dto/auth-credentials.dto";
import { User } from "../entities/user.entity";
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserRepository {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async createUser(createUserDto: AuthCredentialsDto): Promise<User> {
        const { username, password } = createUserDto
        const salt = await bcrypt.genSalt()
        const hashed = await bcrypt.hash(password, salt)
        const newUser = new this.userModel({ username, password: hashed })
        try {
            return await newUser.save()
        } catch (err) {
            console.log(err)
        }

    }

    async getByUsername(username: string): Promise<User> {
        return await this.userModel.findOne({ username: username })
    }
}