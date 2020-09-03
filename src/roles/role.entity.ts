import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Group } from 'src/groups/group.entity';

@Entity()
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role: string;

  @OneToOne(type => Group)
  @JoinColumn()
  group: Group;
 
}