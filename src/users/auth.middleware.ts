
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CollectionsService } from 'src/collections/collections.service';
import { ItemsService } from 'src/items/items.service';
import { Collection } from 'src/collections/collection.entity';
import { Item } from 'src/items/item.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private usersService: UsersService, private collectionsService: CollectionsService,
    private itemsService: ItemsService, private reflector: Reflector) { }
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const allowedRoles = this.reflector.getAllAndMerge<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    const request = context.switchToHttp().getRequest();
    const userId = request.params.userid;
    const method = request.method;
    const user: User = await this.usersService.getUserById(userId);

    //GlobalManager
    if (user.roles.length === 0)
      return Promise.resolve(true);
    else if (allowedRoles.length > 0) {            
      if (request.url.search("collections") !== -1) {
        if (method.search("POST") == -1) {
          const params = request.params;
          const id = params.id;
          return this.isCollectionOperationPermitted(id, user.roles, allowedRoles);  
        }
      }
      else if (request.url.search("items") !== -1) {
        if (method.search("POST") == -1) {
          const params = request.params;
          const id = params.id;
          return this.isItemOperationPermitted(id, user.roles, allowedRoles);          
        }
      }
      return Promise.resolve(false);
    }
  }

  async isCollectionOperationPermitted(collectionId: number, userRoles: any[], allowedRoles: string[]): Promise<boolean> {
    let groupId: number;
    const collection: Collection = await this.collectionsService.getCollectionById(collectionId);
    if (collection.group) {
      groupId = collection.group.id;
      if (userRoles.find(role => role.groupId === groupId &&
        allowedRoles.find(allowedRole => allowedRole === role.role))) {
        return Promise.resolve(true);
      }
    }
    return Promise.resolve(false);
  }

  async isItemOperationPermitted(itemId: number, userRoles: any[], allowedRoles: string[]): Promise<boolean> {    
    const item: Item = await this.itemsService.getItemById(itemId);
    return this.isCollectionOperationPermitted(item.collection.id, userRoles, allowedRoles);
  }
}