import { Injectable } from '@nestjs/common';
import { GroupRepository } from './group.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GroupsService {
    constructor(
        @InjectRepository(GroupRepository)
        private groupRepository: GroupRepository
    ) { }
}
