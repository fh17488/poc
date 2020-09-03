import { Controller, Post, Body, Get, Param, ParseIntPipe, Patch, BadRequestException } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CollectionsService } from 'src/collections/collections.service';
import { Group } from './group.entity';
import { Collection } from 'src/collections/collection.entity';

@Controller('groups')
export class GroupsController {
    constructor(private groupsService: GroupsService, private collectionsService: CollectionsService) { }

    @Get()
    getGroups(): Promise<Group[]> {
        return this.groupsService.getGroups();
    }

    @Get('/:id')
    getGroupById(@Param('id', ParseIntPipe) id: number): Promise<Group> {
        return this.groupsService.getGroupById(id);
    }

    @Patch('/:id/name')
    updateGroupName(
        @Param('id', ParseIntPipe) id: number,
        @Body('name') name: string
    ): Promise<Group> {
        return this.groupsService.updateGroupName(id, name);
    }

    @Patch('/:id/collections')
    async updateGroupCollections(
        @Param('id', ParseIntPipe) id: number,
        @Body('collections') Ids: string
    ): Promise<Group> {
        
            const collectionIds: number[] = Ids.split(',').map((value) => parseInt(value));
            const collections: Collection[] = [];
            for(let i=0; i<collectionIds.length; i++){
                if(!await this.collectionsService.checkIsGroupAssigned(collectionIds[i]))
                collections.push(await this.collectionsService.getCollectionById(collectionIds[i]));    
            }
            if(collections.length!=collectionIds.length)
            {
                collectionIds.forEach(collectionId => {
                    if(!collections.find(collection => collectionId===collection.id))
                        throw new BadRequestException(`Collection with Id ${collectionId} is already assigned to a group.`);
                });
                
            }
            return this.groupsService.updateGroupCollections(id, collections);
    }

    @Post()
    createGroup(@Body('name') name: string): Promise<Group> {
        return this.groupsService.createGroup(name);
    }
}
