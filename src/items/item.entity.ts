import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Collection } from '../collections/collection.entity';

@Entity()
export class Item extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(type => Collection, collection => collection.items, { eager: true })
  collection: Collection;
  
  @Column()
  parentId: number;  
}