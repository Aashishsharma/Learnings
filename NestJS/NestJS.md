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

using CLI ``` nest g service cats```

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

