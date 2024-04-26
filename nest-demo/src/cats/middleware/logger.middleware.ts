import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

// middleware need to have injectable decorator
@Injectable()
// class also need to implement NestMiddleware interface
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`Request...`, req);
    console.log(`Response...`, res);
    next();
  }
}
