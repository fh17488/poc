import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, BaseEntity } from "typeorm";
import { User } from "../users/user.entity";
import { Group } from "src/groups/group.entity";

export enum UserRole {
    GLOBAL_MANAGER = "globalManager",
    GROUP_MANAGER = "manager",
    REGULAR = "regular"
  }

@Entity() 
export class UserToGroup extends BaseEntity {
    @PrimaryGeneratedColumn()
    public userToGroupId!: number;

    @Column()
    public userId!: number;

    @Column()
    public groupId!: number;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.REGULAR
      })
      role: UserRole;

    @ManyToOne(type => User, user => user.roles)
    public user!: User;

    @ManyToOne(type => Group, group => group.userToGroups)
    public group!: Group;
}