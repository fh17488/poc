import { Controller } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CollectionsService } from 'src/collections/collections.service';

@Controller('groups')
export class GroupsController {
    constructor(private groupsService: GroupsService, private collectionsService: CollectionsService){}
}
