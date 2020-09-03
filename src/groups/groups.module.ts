import { Module } from '@nestjs/common';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { CollectionsModule } from 'src/collections/collections.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupRepository } from './group.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([GroupRepository]),
    CollectionsModule],
  controllers: [GroupsController],
  providers: [GroupsService],
  exports: [GroupsService]
})
export class GroupsModule {}
