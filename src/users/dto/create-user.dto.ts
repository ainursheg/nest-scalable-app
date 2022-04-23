import { ApiProperty } from "@nestjs/swagger";
import {IsString, Length, IsEmail} from "class-validator";


export class CreateUserDto {

    @ApiProperty({
        example: 'jackrichardson@popipop.com',
        description: 'User E-mail'
    })
    @IsString({message: 'Supposed to be string'})
    @IsEmail({}, {message: 'Enter valid email'})
    readonly email: string;

    @ApiProperty({
        example: 'StrongPassword_42',
        description: 'User Password'
    })
    @IsString({message: 'Supposed to be string'})
    @Length(8, 64, {message: 'More than 8 and less than 64 characters'})
    readonly password: string;
}