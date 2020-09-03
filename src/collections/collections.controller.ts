import { Controller, Post, Body, Get, ParseIntPipe, Param, Patch } from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { Collection } from './collection.entity';

@Controller('collections')
export class CollectionsController {
    constructor(private collectionsService: CollectionsService) { }

    @Get()
    getCollections(): Promise<Collection[]> {
        return this.collectionsService.getCollections();
    }

    @Get('/:id')
    getCollectionById(@Param('id', ParseIntPipe) id: number): Promise<Collection> {
        return this.collectionsService.getCollectionById(id);
    }

    @Patch('/:id/name')
    updateCollectionName(
        @Param('id', ParseIntPipe) id: number,
        @Body('name') name: string
    ): Promise<Collection> {        
        return this.collectionsService.updateCollectionName(id, name);
    }

    @Post()    
    createCollection( @Body('name') name: string): Promise<Collection> {
        return this.collectionsService.createCollection(name);
    }
}
