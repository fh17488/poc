import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemRepository } from './item.repository';
import { Collection } from 'src/collections/collection.entity';
import { Item } from './item.entity';

@Injectable()
export class ItemsService {

    constructor( 
        @InjectRepository(ItemRepository)
        private itemRepository: ItemRepository
    ){}

    async createItem(collection: Collection, name: string): Promise<Item> {
        return this.itemRepository.createItem(collection, name);
    }

    async getItems(): Promise<Item[]> {
        return this.itemRepository.getItems();
    }

    async getItemById(id: number): Promise<Item> {
        const item = await this.itemRepository.getItemById(id);        

        if (!item) {
          throw new NotFoundException(`Item with ID "${id}" not found`);
        }
    
        return item;
    }

}
