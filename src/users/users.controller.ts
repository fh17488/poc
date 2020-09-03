import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { RolesService } from 'src/roles/roles.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService, private rolesService: RolesService){}
}
