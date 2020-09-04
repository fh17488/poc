import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserToGroup } from '../userToGroup/userToGroup.entity';


@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @OneToMany(type => UserToGroup, userToGroup => userToGroup.user)
  public roles!: UserToGroup[];


}