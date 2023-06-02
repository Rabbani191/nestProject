import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector?: Reflector) {}
  matchRoles(allowedRoles: string[], userRoles: string[]): boolean {
    const commonRoles = allowedRoles.filter((role) => userRoles.includes(role));
    console.log('commonrole', commonRoles);
    return commonRoles.length > 0;
  }
  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const userobj = {
      name: 'umar',
      roles: ['admin'],
    };
    request.user = userobj;
    const user = request.user;
    return this.matchRoles(roles, user.roles);
  }
}
