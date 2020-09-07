
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
      //Get group ID associated with the handler
      let groupId: number;
      if (request.url.search("collections") !== -1) {
        if (method.search("POST") == -1) {
          const params = request.params;
          const id = params.id;
          const collection: Collection = await this.collectionsService.getCollectionById(id);
          if (collection.group) {
            groupId = collection.group.id;
            if (user.roles.find(role => role.groupId === groupId &&
              allowedRoles.find(allowedRole => allowedRole === role.role))) {
              return Promise.resolve(true);
            }
          }
        }
      }
      else if (request.url.search("items") !== -1) {
        if (method.search("POST") == -1) {
          const params = request.params;
          const id = params.id;
          const item: Item = await this.itemsService.getItemById(id);
          const collection: Collection = await this.collectionsService.getCollectionById(item.collection.id);
          if (collection.group) {
            groupId = collection.group.id;
            if (user.roles.find(role => role.groupId === groupId &&
              allowedRoles.find(allowedRole => allowedRole === role.role))) {
              return Promise.resolve(true);
            }
          }
        }
      }
      return Promise.resolve(false);
    }
  }
}