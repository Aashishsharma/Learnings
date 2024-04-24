import { Module } from '@nestjs/common';
import { BasicauthService } from './basicauth.service';
import { BasicAuthController } from './basicauth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '6000s' },
    }),
  ],
  providers: [BasicauthService],
  controllers: [BasicAuthController],
})
export class BasicauthModule {}
