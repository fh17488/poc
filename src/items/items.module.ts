import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemRepository } from './item.repository';
import { CollectionsModule } from 'src/collections/collections.module';

@Module({
  imports: [
    CollectionsModule,
    TypeOrmModule.forFeature([ItemRepository]),    
  ],
  controllers: [ItemsController],
  providers: [ItemsService],
  exports: [ItemsService]
})
export class ItemsModule {}
