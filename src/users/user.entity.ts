import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Role } from 'src/roles/role.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @ManyToMany(type => Role)
  @JoinTable()
  roles: Role[];
 
}