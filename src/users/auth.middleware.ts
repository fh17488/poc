
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private usersService: UsersService) { }
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.params.userid;
    const user: User = await this.usersService.getUserById(userId);

    //GlobalManager
    if (!user.roles)
      return Promise.resolve(true);
    else {
      //TBD: Implement rules for:
      //GroupManager
      //Regular
      // user.roles.forEach(role => {        
      // });      
      
      //block get groups, get collections, get items
      if(request.url.search("groups")!==-1 && request.url.search("groups")+8 <= request.url.length)
        return Promise.resolve(true);           
      else if(request.url.search("collections")!==-1 && request.url.search("collections")+13 <= request.url.length)
        return Promise.resolve(true);           
      else if(request.url.search("items")!==-1 && request.url.search("items")+7 <= request.url.length)
        return Promise.resolve(true);           
      else 
        return Promise.resolve(false);                 
    }
  }
}