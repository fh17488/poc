import { Controller } from '@nestjs/common';
import { RolesService } from './roles.service';
import { GroupsService } from 'src/groups/groups.service';

@Controller('roles')
export class RolesController {
    constructor(private rolesService: RolesService, private groupsService: GroupsService){}
}
