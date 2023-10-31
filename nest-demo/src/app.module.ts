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
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbusersService } from './dbusers/dbusers.service';
import { DbusersModule } from './dbusers/dbusers.module';

@Module({
  imports: [
    CatsModule,
    BasicauthModule,
    UsersModule,
    // typeorm configuration
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      //entities: [User], // this can be tedious if we need to import 100s of entities, instead use autoloadentities
      autoLoadEntities: true, // with this in place every entity registered in the respective module will get omported - imports: [TypeOrmModule.forFeature([User])],
      //(see users.module.ts)
      synchronize: true, // shouldn't be used in production - otherwise you can lose production data
    }),
    DbusersModule,
  ],
  controllers: [AppController, CatsController],
  providers: [AppService, CatsService, DbusersService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      // to exclude routes
      .forRoutes({ path: 'cats', method: RequestMethod.GET });
  }
}
