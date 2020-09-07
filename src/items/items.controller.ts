import { Controller, Post, Body, ParseIntPipe, Get, Param, Patch, Delete } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CollectionsService } from 'src/collections/collections.service';
import { Item } from './item.entity';
import { Roles } from 'src/users/roles.decorator';

@Controller('items')
export class ItemsController {
    constructor(private itemsService: ItemsService, private collectionsService: CollectionsService){}

    @Get()
    async getItems(): Promise<Item[]> {
        return this.itemsService.getItems();
    }

    @Get('/:id')
    @Roles('manager')
    async getItemById(@Param('id', ParseIntPipe) id: number): Promise<Item> {        
        return this.itemsService.getItemById(id);
    }

    @Patch('/:id/name')
    @Roles('manager')
    updateItemName(
        @Param('id', ParseIntPipe) id: number,
        @Body('name') name: string
    ): Promise<Item> {        
        return this.itemsService.updateItemName(id, name);
    }

    @Post()
    @Roles('manager')
    async createItem(
        @Body('collectionId', ParseIntPipe) parentId: number,
        @Body('name') name: string
    ): Promise<Item> {
        return this.itemsService.createItem(await this.collectionsService.getCollectionById(parentId), name);
    }

    @Delete('/:id')
    @Roles('manager')
    deleteItem(@Param('id', ParseIntPipe) id: number): Promise<string> {
        return this.itemsService.deleteItem(id);
    }
}
