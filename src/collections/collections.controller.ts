import { Controller, Post, Body, Get, ParseIntPipe, Param, Patch, Delete } from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { Collection } from './collection.entity';
import { Roles } from 'src/users/roles.decorator';


@Controller('collections')
export class CollectionsController {
    constructor(private collectionsService: CollectionsService) { }

    @Get()
    getCollections(): Promise<Collection[]> {
        return this.collectionsService.getCollections();
    }

    @Get('/:id')
    @Roles('manager')
    getCollectionById(@Param('id', ParseIntPipe) id: number): Promise<Collection> {
        return this.collectionsService.getCollectionById(id);
    }

    @Patch('/:id/name')
    @Roles('manager')
    updateCollectionName(
        @Param('id', ParseIntPipe) id: number,
        @Body('name') name: string
    ): Promise<Collection> {        
        return this.collectionsService.updateCollectionName(id, name);
    }

    @Post()    
    @Roles('manager')
    createCollection( @Body('name') name: string): Promise<Collection> {
        return this.collectionsService.createCollection(name);
    }

    @Delete('/:id')
    @Roles('manager')
    deleteCollection(@Param('id', ParseIntPipe) id: number): Promise<string> {
        return this.collectionsService.deleteCollection(id);
    }
}
