import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "../../database/entities/user.entity";
import { UserRepository } from "../../database/repositories/user.repository";
import { JwtPayload } from "./payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private userRepository: UserRepository
    ) {
        super({
            secretOrKey: 'topSecret',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload: JwtPayload): Promise<User> {
        console.log('payload: ', payload)
        const { username } = payload
        const user: User = await this.userRepository.getByUsername(username)
        console.log('Inside validate')
        if (!user) {
            throw new UnauthorizedException()
        }
        return user
    }
}