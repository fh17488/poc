import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Item } from '../items/item.entity';

@Entity()
export class Collection extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(type => Item, item => item.parentId, { eager: false })
  items: Item[];
  
}