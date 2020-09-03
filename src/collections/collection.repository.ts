import { Collection } from './collection.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Item } from '../items/item.entity';

@EntityRepository(Collection)
export class CollectionRepository extends Repository<Collection> {

 async getCollections(): Promise<Collection[]> {
     const collections: Collection[] = await this.find();     
     return collections;
 }

 async createCollection( name: string ): Promise<Collection> {
    
    const collection = new Collection();
    collection.name = name;
    collection.items = [];
    await collection.save();

    delete collection.items;
    return collection;
  }
}