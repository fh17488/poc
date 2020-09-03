import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CollectionRepository } from './collection.repository';
import { Collection } from './collection.entity';

@Injectable()
export class CollectionsService {

    constructor(
        @InjectRepository(CollectionRepository)
        private collectionRepository: CollectionRepository,
    ) { }


    async getCollections(): Promise<Collection[]> {
        return this.collectionRepository.getCollections();
      }

    async createCollection(name: string): Promise<Collection> {
        return this.collectionRepository.createCollection(name);
    }
}
