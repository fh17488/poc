import { UserRole } from "../../userToGroup/userToGroup.entity";

export class CreateUserDto{
    role: UserRole;
    groupId: number;
};