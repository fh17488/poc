import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { RolesModule } from 'src/roles/roles.module';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    RolesModule],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
