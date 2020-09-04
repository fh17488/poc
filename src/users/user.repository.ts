import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { UserToGroup } from 'src/userToGroup/userToGroup.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async getUsers(): Promise<User[]> {
        const users: User[] = await this.find();
        users.forEach(user => {
            delete user.roles;
        });

        return users;
    }

    async getUserById(id: number): Promise<User> {
        const user = await this.findOne({
            where: { id },
            relations: ["roles"]
        });
        const roles: UserToGroup[] = user.roles;        
        if(roles){
            roles.forEach(role => {
                delete role.userToGroupId;
                delete role.userId;
            });
        }
        return user;
    }

    async createUser(email: string): Promise<User> {

        const user = new User();
        user.email = email;
        await user.save();
        delete user.roles;
        return user;
    }

  
}