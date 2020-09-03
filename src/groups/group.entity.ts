import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Collection } from '../collections/collection.entity';

@Entity()
export class Group extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(type => Collection, collection => collection.group, { eager: false })
  collections: Collection[];
 
}