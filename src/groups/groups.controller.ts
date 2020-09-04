import { Controller, Post, Body, Get, Param, ParseIntPipe, Patch, BadRequestException, Delete } from '@nestjs/common';
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

    @Patch('/:id/collections/link')
    async linkGroupToCollections(
        @Param('id', ParseIntPipe) id: number,
        @Body('collections') Ids: string
    ): Promise<Group> {
        
            const collectionIds: number[] = Ids.split(',').map((value) => parseInt(value));
            const collections: Collection[] = [];
            let otherGroupId: number;
            for(let i=0; i<collectionIds.length; i++){                
                collections.push(await this.collectionsService.getCollectionById(collectionIds[i]));    
            }
            
            collectionIds.forEach(collectionId => {
                if(collections.find(collection => {
                    if(collection.group){
                        otherGroupId = collection.group.id;                    
                        return collectionId===collection.id && collection.group.id!==id;
                    }
                    return false;                     
                }))
                    throw new BadRequestException(`Collection with Id ${collectionId} is already assigned to the group with Id ${otherGroupId}.`);
            });                
            
            return this.groupsService.linkGroupToCollections(id, collections);
    }

    @Patch('/:id/collections/unlink')
    async unlinkGroupFromCollections(
        @Param('id', ParseIntPipe) id: number,
        @Body('collections') Ids: string
    ): Promise<Group> {
        
            const collectionIds: number[] = Ids.split(',').map((value) => parseInt(value));
            const collections: Collection[] = [];            
            for(let i=0; i<collectionIds.length; i++){                
                collections.push(await this.collectionsService.getCollectionById(collectionIds[i]));    
            }
            
            collectionIds.forEach(collectionId => {
                if(!collections.find(collection => {                    
                    return collectionId===collection.id && collection.group && collection.group.id===id;
                }))
                    throw new BadRequestException(`Collection with Id ${collectionId} is not assigned to this group.`);
            });                
            
            return this.groupsService.unlinkGroupFromCollections(id, collections);
    }

    @Post()
    createGroup(@Body('name') name: string): Promise<Group> {
        return this.groupsService.createGroup(name);
    }

    @Delete('/:id')
    deleteGroup(@Param('id', ParseIntPipe) id: number): Promise<string> {
        return this.groupsService.deleteGroup(id);
    }
}
