import { Module } from '@nestjs/common';
import { CollectionsController } from './collections.controller';
import { CollectionsService } from './collections.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionRepository } from './collection.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CollectionRepository])],
  controllers: [CollectionsController],
  providers: [CollectionsService]
})
export class CollectionsModule {}
