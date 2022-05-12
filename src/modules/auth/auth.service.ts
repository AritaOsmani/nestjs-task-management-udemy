import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserRepository } from "../../database/repositories/user.repository";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import * as bcrypt from 'bcrypt'
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "./payload.interface";

@Injectable()
export class AuthService {
    constructor(private userRepository: UserRepository, private jwtService: JwtService) { }

    async signUp(createUserDto: AuthCredentialsDto): Promise<string> {
        const createdUser = await this.userRepository.createUser(createUserDto)
        if (createdUser) {
            return 'User created successfully'
        } else {
            return 'Something went wrong'
        }
    }

    async signIn(signInUser: AuthCredentialsDto): Promise<{ accessToken: string }> {
        const { username, password } = signInUser
        const user = await this.userRepository.getByUsername(username)
        if (user && (await bcrypt.compare(password, user.password))) {
            const payload: JwtPayload = { username }
            const accessToken: string = await this.jwtService.sign(payload)
            return { accessToken }
        } else {
            throw new UnauthorizedException('Please check your login credentials')
        }
    }
}