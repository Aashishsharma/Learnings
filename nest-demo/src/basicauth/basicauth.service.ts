import {
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class BasicauthService implements OnModuleInit {
  onModuleInit() {
    console.log(`Auth service has been initialized.`);
  }
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user?.userpassword !== pass) {
      throw new UnauthorizedException();
    }
    const { userpassword, ...result } = user;
    console.log({ userpassword, result });

    // Generate a JWT and return it here
    // instead of the user object
    const payload = {
      sub: user.id,
      username: user.username,
      role: user.role,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
