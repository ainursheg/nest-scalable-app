import { Body, Controller, Get, Post, UseGuards, UsePipes} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private usersSerivce: UsersService) {}

    @ApiOperation({
        summary: 'Create user'
    })
    @ApiResponse({
        status: 200,
        type: User,
    })
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.usersSerivce.createUser(userDto);
    }

    @ApiOperation({
        summary: 'Get all users',
    })
    @ApiResponse({
        status: 200,
        type: [User],
    })
    @Roles('admin')
    @UseGuards(RolesGuard)
    @Get()
    getAll() {
        return this.usersSerivce.getAllUsers();
    }


    @ApiOperation({
        summary: 'Give role',
    })
    @ApiResponse({
        status: 200,
    })
    @Roles('admin')
    @UseGuards(RolesGuard)
    @Post('/role')
    addRole(@Body() dto: AddRoleDto) {
        return this.usersSerivce.addRole(dto);
    }

    @ApiOperation({
        summary: 'Ban user',
    })
    @ApiResponse({
        status: 200,
    })
    @Roles('admin')
    @UseGuards(RolesGuard)
    @Post('/ban')
    banUser(@Body() dto: BanUserDto) {
        return this.usersSerivce.banUser(dto);
    }
}
