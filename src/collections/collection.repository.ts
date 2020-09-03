import { Collection } from './collection.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Item } from '../items/item.entity';

@EntityRepository(Collection)
export class CollectionRepository extends Repository<Collection> {
//   async getCollections(
//     filterDto: GetTasksFilterDto,
//     user: User,
//   ): Promise<Collection[]> {
//     const { status, search } = filterDto;
//     const query = this.createQueryBuilder('task');

//     query.where('task.userId = :userId', { userId: user.id });

//     if (status) {
//       query.andWhere('task.status = :status', { status });
//     }

//     if (search) {
//       query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `%${search}%` });
//     }

//     const tasks = await query.getMany();
//     return tasks;
//   }

 async getCollections(): Promise<Collection[]> {
     const collections: Collection[] = await this.find();     
     return collections;
 }

  async createCollection( name: string ): Promise<Collection> {
    
    const collection = new Collection();
    collection.name = name;
    collection.items = [];
    await collection.save();

    delete collection.items;
    return collection;
  }
}