import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Group } from 'src/groups/group.entity';

export enum UserRole {
  GLOBAL_MANAGER = "globalManager",
  GROUP_MANAGER = "manager",
  REGULAR = "regular"
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.REGULAR
  })
  role: UserRole;

  @OneToMany(type => Group, group => group.users, { eager: true })
  group: Group[];

}