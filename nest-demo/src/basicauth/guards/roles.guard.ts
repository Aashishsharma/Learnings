import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../roles.enum';
import { ROLES_KEY } from '../roles.decorator';

// need to understand the nelow code
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    // here we ftech user data from the requet object and check the role
    const { user } = context.switchToHttp().getRequest();
    console.log({ requiredRoles });
    return requiredRoles.some((role) => user.role?.includes(role));
  }
}

// Authorization can be of 2 types
// ROle-based (RBAC - role based access control) - above is role based meaning we chek the user role and see if the user can access that route
// Claim based - routes are protected based on claim like - a route can be access with canCreateCat claim
// and user are assigned policies based on the claims - like user is assinged array of cliam (catCreateCat, viewCat etc)
