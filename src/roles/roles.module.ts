import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { GroupsModule } from 'src/groups/groups.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleRepository } from './role.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleRepository]),
    GroupsModule],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService]
})
export class RolesModule {}
