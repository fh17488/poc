import { Item } from './item.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Collection } from '../collections/collection.entity';

@EntityRepository(Item)
export class ItemRepository extends Repository<Item> {

 async getItems(): Promise<Item[]> {
     const items: Item[] = await this.find();   
     items.forEach(item => {
         delete item.collection;
     });  
     return items;
 }

 async getItemById(id: number): Promise<Item> {
    const item = await this.findOne({ where: { id } });
    delete item.collection.group;
    return item;
 }

 async createItem( collection: Collection, name: string ): Promise<Item> {   

    const item = new Item();        
    item.collection = collection;
    item.name = name;    
    await item.save();
    delete item.collection;
    return item;
  }
}