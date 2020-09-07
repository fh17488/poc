import { Module, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { GroupsModule } from 'src/groups/groups.module';
import { UserToGroupRepository } from 'src/userToGroup/userToGroup.repository';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.middleware';
import { ItemsModule } from 'src/items/items.module';
import { CollectionsModule } from 'src/collections/collections.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    TypeOrmModule.forFeature([UserToGroupRepository]),
    GroupsModule,
    CollectionsModule,
    ItemsModule],
  controllers: [UsersController],
  providers: [UsersService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },],
  exports: [UsersService]
})
@UseGuards(AuthGuard)
export class UsersModule {}
