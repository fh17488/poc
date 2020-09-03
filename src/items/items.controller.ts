import { Controller, Post, Body, ParseIntPipe, Get, Param, Patch, Delete } from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { ItemsService } from './items.service';
import { CollectionsService } from 'src/collections/collections.service';
import { Item } from './item.entity';

@Controller('items')
export class ItemsController {
    constructor(private itemsService: ItemsService, private collectionsService: CollectionsService){}

    @Get()
    async getItems(): Promise<Item[]> {
        return this.itemsService.getItems();
    }

    @Get('/:id')
    async getItemById(@Param('id', ParseIntPipe) id: number): Promise<Item> {
        console.log(id);
        return this.itemsService.getItemById(id);
    }

    @Patch('/:id/name')
    updateItemName(
        @Param('id', ParseIntPipe) id: number,
        @Body('name') name: string
    ): Promise<Item> {        
        return this.itemsService.updateItemName(id, name);
    }

    @Post()
    async createItem(
        @Body('collectionId', ParseIntPipe) parentId: number,
        @Body('name') name: string
    ): Promise<Item> {
        return this.itemsService.createItem(await this.collectionsService.getCollectionById(parentId), name);
    }

    @Delete('/:id')
    deleteItem(@Param('id', ParseIntPipe) id: number): Promise<string> {
        return this.itemsService.deleteItem(id);
    }
}
