import { ApiProperty } from "@nestjs/swagger";
import { UserRole } from "@prisma/client";
import { IsNotEmpty, IsString, MinLength, IsEmail } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @ApiProperty()
    password: string;

    @IsString()
    @ApiProperty()
    role: UserRole;
}
