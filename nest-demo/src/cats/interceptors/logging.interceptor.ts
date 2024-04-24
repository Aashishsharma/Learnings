import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// we use rxjs observable - (need to learn RxJS)
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before API handler...'); // this gets called before the handler function is executed

    const now = Date.now();
    return (
      next
        .handle() // we need to call this handle method oterwise the api handler function won't get called
        // this handle method returns RxJS observable
        .pipe(
          tap(() => console.log(`After API handler... ${Date.now() - now}ms`)), // this function gets called after the handler function is executed
        )
    );
  }
}
