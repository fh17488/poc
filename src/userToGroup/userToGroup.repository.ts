import { EntityRepository, Repository } from 'typeorm';
import { UserToGroup, UserRole } from './userToGroup.entity';
import { User } from 'src/users/user.entity';
import { Group } from 'src/groups/group.entity';

@EntityRepository(UserToGroup)
export class UserToGroupRepository extends Repository<UserToGroup> {
    async createUserToGroup(user: User, group: Group, role: UserRole): Promise<UserToGroup> {

        const userToGroup = new UserToGroup();
        userToGroup.user = user;
        userToGroup.group = group;
        userToGroup.role = role;
        await userToGroup.save();
        return userToGroup;
    }
}