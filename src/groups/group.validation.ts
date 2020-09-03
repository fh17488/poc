
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { CollectionsService } from 'src/collections/collections.service';
import { Collection } from 'src/collections/collection.entity';

@Injectable()
export class GroupInputValidationPipe implements PipeTransform {
    constructor(private collectionService: CollectionsService) {}

    async transform(value: any, { metatype }: ArgumentMetadata) {                
        const collectionIds: number[] = value.split(',').map((value)=>parseInt(value));
        const collections: Collection[] = [];
        collectionIds.forEach(async collectionId => {
            //check if it is unassigned to a group
            if(this.collectionService.checkIsGroupAssigned(collectionId)){
                //if yes then throw a validation error
                throw new BadRequestException(`Collection with ID ${collectionId} is already assigned to a group.`);
            }
            //if no then add to collections array
            collections.push(await this.collectionService.getCollectionById(collectionId));
        });
        
        return collections;
      }
    
}