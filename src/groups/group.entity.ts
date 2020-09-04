import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Collection } from '../collections/collection.entity';
import { User } from 'src/users/user.entity';

@Entity()
export class Group extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(type => Collection, collection => collection.group, { eager: false })
  collections: Collection[];

  @ManyToOne(type => User, user => user.group, { eager: false })
  users: User[];
 
}