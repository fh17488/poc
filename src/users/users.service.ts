import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserToGroup } from '../userToGroup/userToGroup.entity';
import { Group } from 'src/groups/group.entity';
import { UserToGroupRepository } from 'src/userToGroup/userToGroup.repository';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        @InjectRepository(UserToGroupRepository)
        private userToGroupRepository: UserToGroupRepository
    ) { }

    async getUsers(): Promise<User[]> {
        return this.userRepository.getUsers();
    }

    async getUserById(id: number): Promise<User> {
        const user = await this.userRepository.getUserById(id);

        if (!user) {
            throw new NotFoundException(`User with ID "${id}" not found`);
        }

        return user;
    }

    async updateUserRoles(id: number, createUserDtos: CreateUserDto[], groups: Group[]): Promise<User> {
        let user = await this.userRepository.getUserById(id);
        delete user.userToGroups;
        for(let i=0; i<createUserDtos.length; i++){
            await this.userToGroupRepository.createUserToGroup(user, groups[i], createUserDtos[i].role);            
        }        
        await user.save();
        user = await this.userRepository.getUserById(id);
        return user;
    }

    async createUser(email: string): Promise<User> {
        return this.userRepository.createUser(email);
    }

    async deleteUser(id: number): Promise<string> {
        const successMessage = `User with Id ${id} successfully deleted.`;
        try {
            const user: User = await this.userRepository.getUserById(id);
            const userToGroups: UserToGroup[] = await this.userToGroupRepository.find({ where: { userId: id } })
            for(let i=0; i<userToGroups.length; i++){
                await userToGroups[i].remove();
            }
            await user.remove();
            return successMessage;
        }
        catch (error) {            
            throw new NotFoundException(`User with Id ${id} not found.`);
        }
    }
}
