import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";

@Controller('auth')

export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/signup')
    signUp(@Body() createUserDto: AuthCredentialsDto): Promise<string> {
        return this.authService.signUp(createUserDto)
    }

    @Post('/signin')
    signIn(@Body() loginUser: AuthCredentialsDto): Promise<{ accessToken: string }> {
        return this.authService.signIn(loginUser)
    }

}