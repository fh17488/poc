import { Injectable, NotFoundException } from '@nestjs/common';
import { GroupRepository } from './group.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './group.entity';
import { Collection } from 'src/collections/collection.entity';

@Injectable()
export class GroupsService {
    constructor(
        @InjectRepository(GroupRepository)
        private groupRepository: GroupRepository
    ) { }

    async getGroups(): Promise<Group[]> {
        return this.groupRepository.getGroups();
    }

    async getGroupById(id: number): Promise<Group> {
        const group = await this.groupRepository.getGroupById(id);

        if (!group) {
            throw new NotFoundException(`Group with ID "${id}" not found`);
        }

        return group;
    }

    async updateGroupName(id: number, name: string): Promise<Group> {
        const group = await this.getGroupById(id);
        group.name = name;
        await group.save();
        return group;
    }

    async linkGroupToCollections(id: number, collections: Collection[]): Promise<Group> {
        let group = await this.getGroupById(id); 
        if(!group.collections)       
            group.collections = collections;
        else{
            for(let i = 0; i < collections.length; i++){
                group.collections.push(collections[i]);
            }
        }
        await group.save();        
        group = await this.getGroupById(id);
        return group;
    }

    async unlinkGroupFromCollections(id: number, collections: Collection[]): Promise<Group> {
        let group = await this.groupRepository.getGroupById(id);         
        let altCollections: Collection[];
        if(group.collections) {            
            altCollections = group.collections.filter(collection =>
                 collections.find(
                     collectionToUnlink => 
                     collectionToUnlink.id!==collection.id))
            group.collections = altCollections;
        }
        await group.save();        
        group = await this.getGroupById(id);
        return group;
    }

    async createGroup(name: string): Promise<Group> {
        return this.groupRepository.createGroup(name);
    }

    async deleteGroup(id: number): Promise<string> {
        const successMessage = `Group with Id ${id} successfully deleted.`;
        try {
            const group: Group = await this.groupRepository.getGroupById(id);
            await this.unlinkGroupFromCollections(id, group.collections);
            await group.remove();
            return successMessage;
        }
        catch (error) {
            throw new NotFoundException(`Group with Id ${id} not found.`);
        }
    }
}
