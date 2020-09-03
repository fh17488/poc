import { Controller, Post, Body, Get } from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { Collection } from './collection.entity';

@Controller('collections')
export class CollectionsController {
    constructor(private collectionsService: CollectionsService) { }

    @Get()
    getCollections(): Promise<Collection[]> {
        return this.collectionsService.getCollections();
    }

    @Post()    
    createCollection( @Body('name') name: string): Promise<Collection> {
        return this.collectionsService.createCollection(name);
    }
}
