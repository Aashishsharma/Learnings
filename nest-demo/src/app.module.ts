import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './cats/middleware/logger.middleware';
import { BasicauthModule } from './basicauth/basicauth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [CatsModule, BasicauthModule, UsersModule],
  controllers: [AppController, CatsController],
  providers: [AppService, CatsService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      // to exclude routes
      .forRoutes({ path: 'cats', method: RequestMethod.GET });
  }
}
