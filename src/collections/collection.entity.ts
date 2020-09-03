import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Item } from '../items/item.entity';
import { Group } from 'src/groups/group.entity';

@Entity()
export class Collection extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(type => Item, item => item.collection, { eager: false })
  items: Item[];
  
  @ManyToOne(type => Group, group => group.collections, { eager: true })
  group: Group;

}