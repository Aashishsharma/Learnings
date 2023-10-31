## NestJS

NestJS is a web framework built on top of Node.js that utilizes TypeScript. It provides type safety, primarily at compile time, as the Nest.js server is compiled to a Node.js Express server that runs JavaScript. Nest.js combines different programming techniques, including:

1. Object-oriented programming.
2. Functional programming.

### Key Characteristics of Functional Programming

| Characteristic          | Description                                                   |
|-------------------------|---------------------------------------------------------------|
| Pure Functions          | Functions have no side effects and produce consistent outputs. |
| Immutability           | Data is not modified after creation; new data is created.     |
| First-Class Functions   | Functions can be treated as variables, arguments, and return values. |
| Avoidance of Loops     | Loops are replaced with functions like map, filter, and reduce. |
| Lazy Evaluation (in some languages) | Expressions are evaluated only when needed (at runtime). |

**Use Case for Functional Programming in Nest.js:** When a web application involves a lot of data transformation, mathematical computations, and working with big data.

### Functional Reactive Programming

Functional Reactive Programming (FRP) is like collecting drops of water from a river, with each drop representing an event or data change. Instead of reacting immediately to every drop, you use tools to process and respond to them more efficiently. It's a way to handle events and data that come at different times, often used for making applications responsive and managing real-time or asynchronous data.

#### Key Concepts of Functional Reactive Programming

| Concept                  | Description                                                  |
|--------------------------|--------------------------------------------------------------|
| Observable Streams       | Data represented as continuous streams or sequences.         |
| Observers                | Subscribers reacting to data emitted by streams.            |
| Declarative Programming  | Describing what should happen in response to data changes.  |
| Data Transformation      | Operators for transforming and manipulating data streams.    |
| Event-Driven             | Suitable for event-driven systems and real-time scenarios.  |
| Backpressure Handling    | Mechanisms to control data flow when there's too much data. |
| Hot and Cold Observables | Observables that produce data whether or not there are subscribers. |
| Reactive Systems         | Systems designed to be responsive, resilient, and elastic.  |

**Use Cases for Functional Reactive Programming:**

1. Real-time data processing (e.g., stock market).
2. Building web applications with responsive and real-time features.

## Installation

node >= 16

```
npm i -g @nestjs/cli
nest new project-name
```

1. Bootstrap code

```javascript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
```

## Nestjs core concepts

### 1. Controllers

Controllers in Nest are responsible for handling incoming requests and returning responses to the client. Nest will route incoming requests to handler functions in controller classes. We use the @Controller() decorator to create a controller class.

Using CLI - ```nest g controller [name]```

```typescript
import { Controller, Get } from '@nestjs/common';
@Controller('entries')
export class EntryController {
@Get()
index(): Entry[] {
const entries: Entry[] = this.entriesService.findAll();
return entries;
}
```

**1. Default response** -  
when a request handler returns a JavaScript object or array, it will automatically be serialized to JSON. When it returns a JavaScript primitive type (e.g., string, number, boolean), however, Nest will send just the value without attempting to serialize it. This makes response handling simple: just return the value, and Nest takes care of the rest.  

**When using libraries like express** -  
we can use - ```response.status(200).send()```

**2. Request Object** -

```javascript
import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(@Req() request: Request): string {
    return 'This action returns all cats';
  }
}
```

Req obj has all the http req details like body, header, queryparams and we can use decorators to extract these information

```javascript
import { Controller, Get, Post, Body, Query, Headers, Request, Response } from '@nestjs/common';

@Controller('example')
export class ExampleController {
  constructor() {}

  @Get('api-handler-example')
  apiHandlerExample(
    @Query() query: any, // @Query('param1') queryParam1: string = 'default1', // to extract param1 queryparam
    @Body() body: any,
    @Headers() headers: any, // @Headers('custom-header') customHeader: string = 'default-header', to extract only specific header
    @Request() request: any,
    @Response() response: any,
  ) {
    const result = {
      queryParameters: query,
      requestBody: body,
      requestHeaders: headers,
      requestObject: request.headers,
      customResponse: 'This is a custom response message',
    };
    
    response.status(201).json(result);
  }
}

```

**3. Resources**
@Get(), @Post(), @Put(), @Delete(), @Patch(), @Options(), and @Head().  
In addition, @All() defines an endpoint that handles all of them.

**4. Route wildcards** -

```javascript
//will match abcd, ab_cd, abecd
@Get('ab*cd')
findAll() {
  return 'This route uses a wildcard';
}
```

The characters ?, +, *, and () may be used in a route path, and are subsets of their regular expression counterparts

**4. Status code** -

```javascript
@Post()
@HttpCode(204)
create() {
  return 'This action adds a new cat';
}
```

TO dynamically send the status code, we need to use library specific status methods  
Like in express ```res.status(201).send()```

**5. Headers** -
To specify a custom response header, you can either use a @Header() decorator or a library-specific response object (and call res.header() directly).

```javascript
@Post()
@Header('Cache-Control', 'none')
create() {
  return 'This action adds a new cat';
}
```

**6. Redirect** -

```javascript
@Get()
@Redirect('https://nestjs.com', 301)
```

**7. Route parameters** -

```javascript
@Get(':id')
findOne(@Param() params: any): string {
  console.log(params.id);
  return `This action returns a #${params.id} cat`;
}
```

**8. Request payloads** -
A DTO (Data Transfer Object) schema is an object that defines how the data will be sent over the network. We could determine the DTO schema by using TypeScript interfaces, or by simple classes.
Always use classes dor DTOs, since  TypeScript interfaces are removed during the transpilation  

```javascript
// create-cat.dto.ts
export class CreateCatDto {
  name: string;
  age: number;
  breed: string;
}

// cats.controller.ts
@Post()
async create(@Body() createCatDto: CreateCatDto) {
  return 'This action adds a new cat';
}
```

This DTO can be used as validation, so if any other property is sent by the client in the request,
it automatically gets stripped out in the handler

### 2. Providers

using CLI ```nest g service cats```

Providers in Nest are used to create services, factories, helpers, and more.  
The main idea of a provider is that it can be injected as a dependency; this means objects can create various relationships with each other, and the function of "wiring up" these objects can largely be delegated to the Nest runtime system.  
Controllers handle req, res, providers handle business logic  
Providers are js classes with @Injectable() decorator

```typescript
//cat.interface.ts
export interface Cat {
  name: string;
  age: number;
  breed: string;
}

//cats.service.ts
import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}

//cats.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  //CatsService is injected through the class constructor
  constructor(private catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}
```

#### Dependency Injection

Why?

1. It help to write loosely coupled code
2. Since the classes are loosely coupled, we can test the classes separately by creating a mock in unit tests, if the classes are tightly coupled it is diffuclt to create the mock objects

Instead od we creating instance of a dependent object in the required class manually, framework does this for us.
Nest framework does this by looking at 3 decorators  

1. @Module() - it starts from the main app module and see all the imports in that module, then is scans each of the module separately
2. @Component() - in each of the module we will have component and providers - compoents requires the depenedency and this is done with instantiating the rquired class obj in the constructor -

```javascript
constructor(private catsService: CatsService) {}
```

3. @Injectable() - This decorator is added to a class which act as a dependent class (whose obj would be instattiated in the @Component's controller)

### 3. Modules

using CLI ```nest g module cats```  

modules are singletons by default

A Nest.js application is organized into modules. Every Nest.js application will have a root module  
providers defined in a module are visible to other members of the module without the need to export them  
We need to import/export the services to other modules, when we do this DI (meaning we can inject the instance of a service in the constructor) will work in nestjs 
The @Module() decorator takes a single object with below properties

| Module Key        | Description                               |
|-------------------|-------------------------------------------|
| `imports`         | the list of imported modules that export the providers which are required in this module.|
| `exports`         | the subset of providers that are provided by this module and should be available in other modules which import this module      |
| `providers`       | the providers that will be instantiated by the Nest injector and that may be shared at least across this module. |
| `controllers`     | the set of controllers defined in this module which have to be instantiated |
| `components`      | Provides additional components, such as pipes or guards. |

```typescript
// cats.module.ts
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}

// then also import this module in the app module
// app.module.ts
import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [CatsModule],
})
export class AppModule {}

```

Directory structure would be
src
|-- cats
|   |-- dto
|   |   |-- create-cat.dto.ts
|   |-- interfaces
|   |   |-- cat.interface.ts
|   |-- cats.controller.ts
|   |-- cats.module.ts
|   |-- cats.service.ts
|-- app.module.ts
|-- main.ts

Sharing providers between modules

```javascript
//cats.module.ts
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
  // export the service/provider
  exports: [CatsService]
})
export class CatsModule {}

//now any module that imports this module has access to the CatsService
```

By default providers are accessible within the scope of the module.  
When you want to provide a set of providers which should be available everywhere (in all modules )(e.g., helpers, database connections, etc.), make the module global with the @Global() decorator.

```javascript
import { Module, Global } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Global()
@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule {}
// now CatsService can be used in any module without importig the cats.module
```

##### Dynamic Modules

TO-DO

## Middlewares

Middleware is a function which is called before the route handler.

It can -  

1. execute any code.
2. make changes to the request and the response objects.
3. end the request-response cycle.
4. call the next middleware function in the stack.
5. if the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function. Otherwise, the request will be left hanging.

Middlewares in Nest can be added to a class or a function with @Injectable() decorator  

**1. Middleware in a class**

```javascript
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

// middleware need to have injectable decorator
@Injectable()
// class also need to implement NestMiddleware interface
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    next();
  }
}
```

To apply the middleware we need to write below code in the modules class

```javascript
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [CatsModule],
})

// implemts NestModule and configure the middleware in the configure() method
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      // to exclude routes
      .exclude(
    { path: 'cats', method: RequestMethod.GET },
    { path: 'cats', method: RequestMethod.POST },
    'cats/(.*)',
    )
      .forRoutes({ path: 'cats', method: RequestMethod.GET }); // applies middleware for all get methods inside cats routes
      // route wildcards
      .forRoutes({ path: 'ab*cd', method: RequestMethod.ALL });
      // can also take a controller
      .forRoutes(CatsController);
      // multiple controllers
      .forRoutes([CatsController, abcdController]);
  }
}
```

**2. Middleware in a function** -

```javascript
//logger.middleware.ts
import { Request, Response, NextFunction } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`Request...`);
  next();
};

// in app.module.ts
consumer
  .apply(logger)
  .forRoutes(CatsController);

//applying multiple middlewares in sequence
consumer.apply(cors(), helmet(), logger).forRoutes(CatsController);

// global middleware
const app = await NestFactory.create(AppModule);
app.use(logger);
await app.listen(3000);

```

## Exception filters

When an exception is not handled by your application code, it is caught by this layer, which then automatically sends an appropriate user-friendly response.  
All HttpException and subclasses of this excpetion are handeled by Nestjs.  
When there is any other exception Nest js throws {"statusCode": 500, "message": "Internal server error"}

```javascript
import {HTTPException, HTTPStatus} from '@nest/common'

@Get()
async findAll() {
  throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
}

//api reposne would be
{
  "statusCode": 403,
  "message": "Forbidden"
}

// the first arg can be on object as well and this class constructor also has optional 3rd arg
@Get()
async findAll() {
  try {
    await this.service.findAll()
  } catch (error) { 
    throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: 'This is a custom message',
    }, HttpStatus.FORBIDDEN, {
      cause: error // 3rd arg - this is only for logging not sent to client
    });
  }
}
//api respone
{
  "status": 403,
  "error": "This is a custom message"
}
```

**Custom exception** -

```javascript
// forbidden.exception.ts
// should extend HttpException
export class ForbiddenException extends HttpException {
  constructor() {
    super('Forbidden', HttpStatus.FORBIDDEN);
  }
}

//cats.controller.ts
@Get()
async findAll() {
  throw new ForbiddenException();
}
```

**Built-in HTTP exceptions** -

1. BadRequestException
2. UnauthorizedException
3. NotFoundException
4. ForbiddenException
5. RequestTimeoutException
6. MethodNotAllowedException
7. PreconditionFailedException
and many more

```javascript
throw new BadRequestException('Something bad happened', { cause: new Error(), description: 'Some error description' })
// apoi resopnse
{
  "message": "Something bad happened",
  "error": "Some error description",
  "statusCode": 400,
}
```

**Exception Filters** -  let you control the exact flow of control and the content of the response sent back to the client.  
These filters have access to the contect object

```javascript
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

// use this decorator which tells Nest hat this particular filter is looking for exceptions of type HttpException and nothing else. 
//The @Catch() decorator may take a single parameter, or a comma-separated list
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  // must implement catch method which takes 2 args
  // exception object
  // ArgumentHost object which give all the information of the context making it smart unlike middlewares which are dumb
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}

// now we need to bind this exception to the request handler function
@Post()
@UseFilters(new HttpExceptionFilter()) // binding the exception
async create(@Body() createCatDto: CreateCatDto) {
  throw new ForbiddenException();
}

// this can be bound to a class controller as well
// then all the routes within this controller will use this exception
@UseFilters(new HttpExceptionFilter())
export class CatsController {}

// global level exception
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
```

## Pipes

@Injectable() decorator, and need to implement PipeTransform interface.  

Pipes are designed for 2 purpose  

1. data transformation
2. validate input data

A Pipe is executed just before a method is invoked, and the pipe receives the arguments destined for the method and operates on them

Implementations  -

1. Create a pipe or use a built-in pipe
2. Map the pipe with the route

**Built-in pipes** -

1. ValidationPipe
2. ParseIntPipe
3. ParseFloatPipe
4. ParseBoolPipe
5. ParseArrayPipe
6. ParseUUIDPipe
7. ParseEnumPipe
8. DefaultValuePipe
9. ParseFilePipe

To use a pipe, we need to bind an instance of the pipe class to the appropriate context.

```javascript
@Get(':id')
async findOne(@Param('id', ParseIntPipe) id: number) {
  return this.catsService.findOne(id);
}

// GET localhost:3000/abc
{
  "statusCode": 400,
  "message": "Validation failed (numeric string is expected)",
  "error": "Bad Request"
}

// with querystring parameter
@Get()
async findOne(@Query('id', ParseIntPipe) id: number) {
  return this.catsService.findOne(id);
}

// send custom http response
@Get(':id')
async findOne(
  //here we are creating new instance of the pipe
  @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
  id: number,
) {
  return this.catsService.findOne(id);
}
```

**Custom pipes** -

1. Create a custom pipe class whick implements PipeTransfrom interface
2. Use it in the handler method

```javascript
// 1. create pipe
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class InputTextValidator implements PipeTransform<string, string> {
  transform(value: string, metadata: ArgumentMetadata): string {
    console.log({ metadata });
    if (!/^[a-zA-Z]+$/.test(value)) {
      throw new BadRequestException('Invalid input. Only letters are allowed.');
    }
    return value;
  }
}

// 2. use in the handler
  @Get('validate/:text')
  getText(@Param('text', InputTextValidator) text: string) {
    return `Valid input: ${text}`;
  }
```

**Schema based validation using Zod** -  
Schema validation can be done at middleware as well instead of doing it in pipes, but middlewares are dumb meaning middleware is unaware of the execution context, including the handler that will be called next.  
Pipes are aware about the execution context.

1. Create validation class implementing PipeTransform interface
2. In the constructor provide schema create viz Zod
3. use schema.parse() to  validate our incoming argument against the provided schema.

```javascript
import { PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ZodObject } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodObject<any>) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      this.schema.parse(value);
    } catch (error) {
      throw new BadRequestException('Validation failed');
    }
    //here we are just returing value
    //we can alos transform this value
    //since pipes are also ment to transfor the data
    return value;
  }
}
```

4. Now bind this pipe to the method handler, 3 steps are required  

1. Create zodSchema
2. Crette instance of the schema
3. use @usePipes() decorator

```javascript
// step 1 - create zod schema
// cat.dto.ts
import { z } from 'zod';

export const createCatSchema = z
  .object({
    name: z.string(),
    age: z.number(),
    breed: z.string(),
  })
  .required();

export type CreateCatDto = z.infer<typeof createCatSchema>;

// Step 2 and 3
@Post()
@UsePipes(new ZodValidationPipe(createCatSchema)) // create instance and pass the zodSchema as arg to this instance
// and use @UsePipes decorator
async create(@Body() createCatDto: CreateCatDto) {
  this.catsService.create(createCatDto);
}
```

**Settiin up validation pipes globally** -

```javascript
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
```

## Guards

A guard is a class annotated with the @Injectable() decorator, which implements the CanActivate interface.  
Guards are mainly used for authorization - which are  used to determine whether a given request will be handled by the route handler or not, depending on certain conditions (like permissions, roles, ACLs, etc.) present at run-time.  
Authentication can be done in middleware as well but not authorization, since Guards have access to ExecutionContext and thus know exactly what's going to be executed next but middlewares do not.  

**Guards are executed after all middleware, but before any interceptor or pipe.**  

```javascript
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  // canactive function must retrrn a boolean
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return validateRequest(request);
  }
}
```

**To-do - implement authentication and authorization**

## Interceptors -

An interceptor is a class annotated with the @Injectable() decorator and implements the NestInterceptor interface  

1. bind extra logic before / after method execution
2. extend the basic function behavior
3. completely override a function depending on specific conditions (e.g., for caching purposes)  

Each interceptor implements the intercept() method, which takes two arguments.

1. ExecutionContext : ArgumentHost - adds several new helper methods that provide additional details about the current execution process  
2. CallHandler - this interface implements the handle() method  

usecase - logging

```javascript
// logging.interceptor.ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// we use rxjs observable - (need to learn RxJS)
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before API handler...'); // this gets called before the handler function is executed

    const now = Date.now();
    return next
      .handle() // we need to call this handle method oterwise the api handler function won't get called
      // this handle method returns RxJS observable
      .pipe(
        tap(() => console.log(`After API handler... ${Date.now() - now}ms`)), // this function gets called after the handler function is executed
      );
  }
}

// now we need to bind this interceptor to a controller or a method of a controller
@UseInterceptors(LoggingInterceptor)
export class CatsController {}

// output would be -
// Before API handler
// In API handler
// After API handler - currentDate
// this way we can log the time taken by the API handler

//global interceptor
const app = await NestFactory.create(AppModule);
app.useGlobalInterceptors(new LoggingInterceptor());
```

## Custom Decorators

In the node.js world, it's common practice to attach properties to the request object. Then you manually extract them in each route handler, using code like the following:  

```javascript
const user = req.user;
```

```javascript
// step 1 - create a new decorator
// user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// this is a parameter decorator
export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    // ctx.switchToHttp() is called to switch the execution context to the HTTP context. 
    // This is necessary because Nest.js supports multiple transport layers, 
    // and this code is specifically interested in the HTTP context.
    const request = ctx.switchToHttp().getRequest(); // .getRequest() returns the request object
    return request.user; // here we are returning the request.user so that this user property of request ia available when this decorator is used
    // note we are assuming that user property is already availabe in the request object
  },
);

// now we can use this decorator
@Get()
async findOne(@User() user: UserEntity) {
  console.log(user);
}

```

## Execution Context
We used this context above in guards, pipes  
These are tility classes that help make it easy to write applications that function across multiple application contexts (e.g., Nest HTTP server-based, microservices and WebSockets application contexts).  


Two classes are widely used and Nest provides an instance of these 2 classes in places you may need it, such as in the canActivate() method of a guard and the intercept() method of an interceptor.  

1. ArgumentHost class
The ArgumentsHost class provides methods for retrieving the arguments being passed to a handler. It allows choosing the appropriate context (e.g., HTTP, RPC (microservice), or WebSockets) to retrieve the arguments from.  
ArgumentsHost simply acts as an abstraction over a handler's arguments. For example, for HTTP server applications (when @nestjs/platform-express is being used), the host object encapsulates Express's [request, response, next] array, where request is the request object, response is the response object, and next is a function that controls the application's request-response cycle. On the other hand, for GraphQL applications, the host object contains the [root, args, context, info] array.  

When building generic guards, filters, and interceptors which are meant to run across multiple application contexts, we need a way to determine the type of application that our method is currently running in.  

```typescript
if (host.getType() === 'http') {
  // do something that is only important in the context of regular HTTP requests (REST)
} else if (host.getType() === 'rpc') {
  // do something that is only important in the context of Microservice requests
} else if (host.getType<GqlContextType>() === 'graphql') {
  // do something that is only important in the context of GraphQL requests
}

// then based on the type we can switch the context as below

/**
 * Switch context to RPC.
 */
switchToRpc(): RpcArgumentsHost;
/**
 * Switch context to HTTP.
 */
switchToHttp(): HttpArgumentsHost;
/**
 * Switch context to WebSockets.
 */
switchToWs(): WsArgumentsHost;


// we used below code in pipe. guards, exception filter etc - 
const ctx = host.switchToHttp();
const request = ctx.getRequest<Request>();
const response = ctx.getResponse<Response>();
```

2. ExecutionContext class - 
ExecutionContext extends ArgumentsHost, providing additional details about the current execution process.  

```javascript
//2 methods wehich can be used to get additional details - 
const methodKey = ctx.getHandler().name; // returns a reference to the handler about to be invoked. 
const className = ctx.getClass().name; //  returns the type of the Controller class which this particular handler belongs to

// For example, in an HTTP context, if the currently processed request is a POST request,
// bound to the create() method on the CatsController, getHandler() returns a reference to the create() method 
// and getClass() returns the CatsControllertype (not instance).

// IMP  - it gives us the opportunity to access the metadata set through either decorators 
// this is waht is used in the - roles.guard.ts file in nest-demo example

// cretae your own decorator
// roles.decorator.ts
import { SetMetadata } from '@nestjs/common';
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

// then use this roles decorator
@Post()
@Roles('admin')
async create(@Body() createCatDto: CreateCatDto) {
  this.catsService.create(createCatDto);
}

// and then use the reflector class to get the metadata
// roles.guard.ts
@Injectable()
export class RolesGuard {
  constructor(private reflector: Reflector) {}
}
// use the reflector.get() mthod to read the metadata and then compare with the user role 
// to determine if the request needs to be passed or rejected
const roles = this.reflector.get<string[]>('roles', context.getHandler());
```

## Lifecycle events
Nest provides lifecycle hooks that give visibility into key lifecycle events, and the ability to act (run registered code on your modules, providers or controllers) when they occur.  

| Lifecycle hook method        | Lifecycle event triggering the hook method call                                             |
| ---------------------------- | --------------------------------------------------------------------------------------------- |
| onModuleInit()               | Called once the host module's dependencies have been resolved.                              |
| onApplicationBootstrap()     | Called once all modules have been initialized, but before listening for connections.        |
| onModuleDestroy()*           | Called after a termination signal (e.g., SIGTERM) has been received.                          |
| beforeApplicationShutdown()*  | Called after all onModuleDestroy() handlers have completed (Promises resolved or rejected); once complete (Promises resolved or rejected), all existing connections will be closed (app.close() called). |
| onApplicationShutdown()*     | Called after connections close (app.close() resolves).                                       |


onModuleDestroy, beforeApplicationShutdown and onApplicationShutdown are only triggered if you explicitly call app.close()  

Execution order of onModuleInit() and onApplicationBootstrap() directly depends on the order of module imports, awaiting the previous hook.  

```javascript
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class UsersService implements OnModuleInit {
  onModuleInit() {
    console.log(`The module has been initialized.`);
  }

  // async version
  async onModuleInit(): Promise<void> {
  await this.fetch();
}
}

// for shutdown hooks we need to explicitly enable them - 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Starts listening for shutdown hooks
  app.enableShutdownHooks();

  await app.listen(3000);
}
bootstrap();

// shutdown hooks are often used with Kubernetes to manage containers' lifecycles, by Heroku for dynos or similar services.

```

## Circular dependency

A circular dependency in NestJS occurs when two or more modules or classes depend on each other directly or indirectly.  
Circular dependnecy can occure in providers(services) or on modules

| Problem                                            | Description                                                                                                       |
|---------------------------------------------------|-------------------------------------------------------------------------------------------------------------------|
| Code Organization and Maintainability              | Circular dependencies can make the codebase harder to organize and maintain, leading to confusion for developers.  |
| Initialization Order                               | Circular dependencies can result in difficulties ensuring the correct order of module initialization.             |
| Testing Complexity                                 | Writing unit tests for modules with circular dependencies can become more complex and may require mocking.         |
| Maintaining Separation of Concerns                 | Circular dependencies can blur the separation of concerns between modules, violating good software design practices. |

**Use forward reference to avoid circular dependency issue** - 
 For example, if CatsService and CommonService depend on each other,  

 ```javascript
 //cats.service.ts
 @Injectable()
export class CatsService {
  constructor(
    @Inject(forwardRef(() => CommonService))
    private commonService: CommonService,
  ) {}
}

// common.service.ts
@Injectable()
export class CommonService {
  constructor(
    @Inject(forwardRef(() => CatsService))
    private catsService: CatsService,
  ) {}
}

// in case of modules

//cats.module.ts
@Module({
  imports: [forwardRef(() => CommonModule)],
})
export class CatsModule {}

// common.module.ts
@Module({
  imports: [forwardRef(() => CatsModule)],
})
export class CommonModule {}
 ```

## Configuration
In Node.js we use .env files to store configs but as the number of environments and configuration variables grows, it can become increasingly complex and hard to keep track of.

Instead use @nestjs/config package, whcich easily swipes .env files  

```javascript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
})
export class AppModule {}
```


## Dynamic modules


## DB connection using TypeORM -

<https://thriveread.com/nestjs-typeorm-mssql/>

```npm i mssql typeorm @nest/typeorm --save```

```javascript
//step 1 - create ormconfig.ts
import { SqlServerConnectionOption } from 'typeorm/driver/sqlserver/SqlServerConnectionOption'
import {User_Test} from './user/user.entity'

const config: SqlServerConnectionOption = {
    type: "mssql",
    host: "AUSPWDGADB07.aus.amer.dell.com",
    database: "DFS_MKTG",
    synchronize: false,
    schema: "DBO",
    options: {
      trustServerCertificate: true
    },
    authentication: {
      type: "ntlm",
      options: {
        userName: '',
        password: '',
        domain: 'americas'
      }
    },
    entities: [User_Test]
}

// step 2 - configure app module to use TypeORMModule
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { TypeOrmModule } from '@nest/typeorm';
import { DataSource } from 'typeorm';
import config from './ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot({...config, autoLoadEntities: true}), UserModule],
})
export class AppModule implements NestModule {

  // inject the DataSource instance using DI
  constructor(private dataSource: DataSource)
}

// step 3 - create user enitity
// user.entity.ts
export class User_Test {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', length: 60, nullable: false })
  name: string;

  @Column({ name: 'address', length: 160, nullable: false })
  address: string;

  @Column({ name: 'grade', type: 'int', nullable: true })
  grade: number;
}

// step 4 - configure user.module.ts
import { TypeOrmModule } from '@nest/typeorm';
import { User_Test } from './user.entity'
@Module({
  imports: [TypeOrmModule.forRoot([User_Test])],
})

// stpe 5 - make crud operations in user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User_Test } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(User_Test)
    private userRepository: Repository<User_Test>,
  ) {}
  // You add all CRUD logics here

  // Fetch all users from the database
  async fetchUsers(): Promise<User_Test[]> {
    return this.userRepository.find();
  }

  // Add a new user to the database
  async addNote(createUserDto): Promise<User_Test> {
    const { title, content, rating } = createUserDto;
    const user = this.userRepository.create({
      name,
      address,
      grade
    });
    await this.userRepository.save(user);
    return user;
  }
}

// step -6 - call crud methods from the controller
// user.controller.ts

import { Body, Controller, Get} from '@nestjs/common';
import { UserService } from './user.service';
import { User_Test } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  // Retrieve all users
  @Get()
  getNotes() {
    return this.userService.fetchUsers();
  }

  // Create a new user
  @Post()
  createNote(@Body() createUser): Promise<User_Test> {
    return this.userService.addUser(createUser);
  }

```

TODO

1. Configuration
3. Task scheduling
4. Custom providers
5. Async providers
10. https://medium.com/@0xAggelos/building-a-secure-authentication-system-with-nestjs-jwt-and-postgresql-e1b4833b6b4e
