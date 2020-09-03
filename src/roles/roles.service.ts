import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleRepository } from './role.repository';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(RoleRepository)
        private roleRepository: RoleRepository
    ) { }
}
