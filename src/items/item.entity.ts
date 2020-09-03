import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Collection } from '../collections/collection.entity';

@Entity()
export class Item extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(type => Collection, collection => collection.items, { eager: true })
  @JoinColumn({ name: "parentId" })
  collection: Collection;
 
}