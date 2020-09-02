import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { GroupsModule } from './groups/groups.module';
import { RolesModule } from './roles/roles.module';
import { CollectionsModule } from './collections/collections.module';
import { ItemsModule } from './items/items.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';


@Module({
  imports: [ TypeOrmModule.forRoot(typeOrmConfig), 
    UsersModule, GroupsModule, RolesModule, CollectionsModule, ItemsModule],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
