import { Injectable, NotFoundException } from '@nestjs/common';
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

    async getCollectionById(id: number): Promise<Collection> {
        const collection = await this.collectionRepository.findOne({ where: { id } });

        if (!collection) {
          throw new NotFoundException(`Collection with ID "${id}" not found`);
        }
    
        return collection;
    }

    async updateCollectionName(id: number, name: string): Promise<Collection> {
        const collection = await this.getCollectionById(id);        
        collection.name = name;        
        await collection.save();
        return collection;
    }

    async createCollection(name: string): Promise<Collection> {
        return this.collectionRepository.createCollection(name);
    }


}
