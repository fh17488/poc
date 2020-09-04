import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async getUsers(): Promise<User[]> {
        const users: User[] = await this.find();
        users.forEach(user => {
            delete user.userToGroups;
        });

        return users;
    }

    async getUserById(id: number): Promise<User> {
        const user = await this.findOne({
            where: { id },
            relations: ["userToGroups"]
        });
        return user;
    }

    async createUser(email: string): Promise<User> {

        const user = new User();
        user.email = email;
        await user.save();
        delete user.userToGroups;
        return user;
    }

  
}