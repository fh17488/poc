import { EntityRepository, Repository } from 'typeorm';
import { Group } from './group.entity';

@EntityRepository(Group)
export class GroupRepository extends Repository<Group> {

    async getGroups(): Promise<Group[]> {
        const groups: Group[] = await this.find();
        groups.forEach(group => {
            delete group.collections;
        });

        return groups;
    }

     async getGroupById(id: number): Promise<Group> {
        const group = await this.findOne({ where: { id } ,
             relations: ["collections"] });
        
        if(group.collections){
            group.collections.forEach(collection => {
                delete collection.group;
                delete collection.items;
            }); 
        }
        return group;
     }     

    async createGroup(name: string): Promise<Group> {

        const group = new Group();
        group.name = name;
        await group.save();
        delete group.collections;
        return group;
    }
}