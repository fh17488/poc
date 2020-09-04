import { Controller, Post, Body, Get, Param, ParseIntPipe, Patch, ParseArrayPipe, Delete, NotFoundException, HttpException, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { GroupsService } from 'src/groups/groups.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Group } from 'src/groups/group.entity';
import { QueryFailedError } from 'typeorm/error/QueryFailedError';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService, private groupsService: GroupsService) { }

    @Get()
    getUsers(): Promise<User[]> {
        return this.usersService.getUsers();
    }

    @Get('/:id')
    getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
        return this.usersService.getUserById(id);
    }

    @Patch('/:id/roles')
    async updateUserRoles(@Param('id', ParseIntPipe) id: number,
        @Body('roles', new ParseArrayPipe({
            optional: true,
            items: CreateUserDto,
            separator: ','
        })) createUserDtos: CreateUserDto[]): Promise<User> {
        try {
            const user: User = await this.getUserById(id);
            if (user) {
                const groups: Group[] = [];
                for (let i = 0; i < createUserDtos.length; i++) {
                    groups.push(await this.groupsService.getGroupById(createUserDtos[i].groupId));
                }
                return this.usersService.updateUserRoles(id, createUserDtos, groups);
            }
        }
        catch (error) {
            // console.log(error);
            throw new NotFoundException(`User with Id ${id} not found.`);
        }
    }
    
    @Post()
    createGroup(@Body('email') email: string): Promise<User> {
        return this.usersService.createUser(email);
    }

    @Delete('/:id')
    deleteUser(@Param('id', ParseIntPipe) id: number): Promise<string> {
        return this.usersService.deleteUser(id);
    }
}
