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

    async updateItemName(id: number, name: string): Promise<Item> {
        const item = await this.getItemById(id);        
        item.name = name;        
        await item.save();
        return item;
    }

    async deleteItem(id: number): Promise<string> {        
        const successMessage = `Item with Id ${id} successfully deleted.`;
        try {
            const item: Item = await this.getItemById(id);
            await item.remove();
            return successMessage;
        }
        catch(error) {
            throw new NotFoundException(`Item with ID "${id}" not found`);
        }        
    }
}
