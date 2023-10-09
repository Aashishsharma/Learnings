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

## Nestjs core concepts
### 1. Controllers
Controllers in Nest are responsible for handling incoming requests and returning responses to the client. Nest will route incoming requests to handler functions in controller classes. We use the @Controller() decorator to create a controller class.

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

### 2. Providers
Providers in Nest are used to create services, factories, helpers, and more that
can be injected into controllers and other providers using Nest’s built-in
dependency injection. The @Injectable() decorator is used to create a provider
class.

```typescript
@Injectable()
export class AuthenticationService {
constructor(private readonly userService: UserService) {}
async validateUser(payload: {
email: string;
password: string;
}): Promise<boolean> {
const user = await this.userService.findOne({
where: { email: payload.email }
});
return !!user;
}
}
```

### 3. Modules
A Nest.js application is organized into modules.
Every Nest.js application will have a root module

| Module Key        | Description                               |
|-------------------|-------------------------------------------|
| `imports`         | Imports other modules used by this module.|
| `exports`         | Exposes components to other modules.      |
| `providers`       | Defines the providers (services) used by this module. |
| `controllers`     | Defines the controllers used by this module. |
| `components`      | Provides additional components, such as pipes or guards. |

```typescript
@Module({
components: [],
controllers: [],
imports: [
DatabaseModule,
AuthenticationModule.forRoot('jwt'),
UserModule,
EntryModule,
CommentModule,
UserGatewayModule,
CommentGatewayModule
],
exports: [],
})
export class AppModule implements NestModule {}
```

Modules in Nest.js are singletons by default. This means that you can share the
same instance of an exported component
between modules without any effort