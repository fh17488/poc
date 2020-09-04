import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { GroupsService } from 'src/groups/groups.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService, private groupsService: GroupsService){}
}
