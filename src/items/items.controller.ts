import { Controller, Post, Body, ParseIntPipe, Get, Param } from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { ItemsService } from './items.service';
import { CollectionsService } from 'src/collections/collections.service';
import { Item } from './item.entity';

@Controller('items')
export class ItemsController {
    constructor(private itemService: ItemsService, private collectionService: CollectionsService){}

    @Get()
    async getItems(): Promise<Item[]> {
        return this.itemService.getItems();
    }

    @Get('/:id')
    async getItemById(@Param('id', ParseIntPipe) id: number): Promise<Item> {
        console.log(id);
        return this.itemService.getItemById(id);
    }

    @Post()
    async createItem(
        @Body('collectionId', ParseIntPipe) parentId: number,
        @Body('name') name: string
    ): Promise<Item> {
        return this.itemService.createItem(await this.collectionService.getCollectionById(parentId), name);
    }

}
