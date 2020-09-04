import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { GroupsModule } from 'src/groups/groups.module';
import { UserToGroupRepository } from 'src/userToGroup/userToGroup.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    TypeOrmModule.forFeature([UserToGroupRepository]),
    GroupsModule],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
