import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator"

export class AuthCredentialsDto {

    @IsString({ message: 'Username not a string!' })
    @IsNotEmpty({ message: 'Username not provided!' })
    @MinLength(4)
    @MaxLength(20)

    username: string

    @IsString({ message: 'Password not a string!' })
    @IsNotEmpty({ message: 'Password not provided!' })
    @MinLength(8)
    @MaxLength(20)
    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, { message: 'Password is weak!' })

    password: string
}