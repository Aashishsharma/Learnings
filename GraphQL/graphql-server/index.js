// 2 common ways to create apollo server
// 1. using apollostandalone server
// 2. using apolloserverexpress
// STEPS to use graphql + express
// 1. Use expressMiddleware to use express + graphql (need to pass 2 args - http server, optionl context arg)
// 2. we need to create http server using express
// 3. pass the created http erver to express middleware as arg

// npm install @apollo/server express graphql
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import { typeDefs } from './schema.js';
import { resolvers } from './resolvers.js';
import cors from 'cors';

const app = express();
app.use(
  cors({
    origin: 'http://localhost:5173', // vite frontend
  }),
);
// note that we need to pass in http server and not express server to the expressmiddleware
const httpServer = http.createServer(app);

// ApolloServer initialization for our httpServer.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // Below, we tell Apollo Server to "drain" this httpServer,
  // enabling our servers to shut down gracefully.
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  // note that below conext won't work, becuase this works only when using apollo standalone server
  // but we are using apolloserverexpress, hence we need to use context in express middleware (see below)
  context: async ({ req }) => {},
});
// Ensure we wait for our server to start
await server.start();

// we need to use expressMiddleWare to enable graphql and express integration
// all https requests with endpoint /graphql will be sent to this endpoint
app.use(
  '/graphql',
  // here we can specify our custom middlewares
  express.json({ limit: '50mb' }),
  // expressMiddleware accepts 2 arguments:
  // an Apollo Server instance and optional configuration options
  expressMiddleware(server, {
    // using context, this code will run as middleware for every gql query run from the client
    context: async ({ req, res }) => {
      const token = req.headers.authorization || '';
      console.log('token received in middleware ', token);
      return { req, res };
    },
  }),
);

// normal express endpoint to handle REST apis
app.get('/api', (req, res) => {
  console.log('express route');
  res.json({ message: 'Express app endpoint' });
});

app.listen({ port: 4000 }, () => {
  console.log(`🚀 Server ready at http://localhost:4000/`);
});

// 2 ways to create http server
// 1 using inbuilt http module
// 2 using express server

// using express server
/*
  var express = require('express');
  var app = express();
  app.listen(1234);
*/

// using http + express
/*
  var express = require('express');
  var http = require('http');
  var app = express();
  var server = http.createServer(app);
  server.listen(1234);
*/

// both methods create express server using http
// using method 1 only express server is created
// using method 2 - if we want to create socket.io connectio + http connection on same HTTP server instance

/*
var express = require('express');
var app     = express();
var server  = require('http').createServer(app);
var io      = require('socket.io').listen(server);
server.listen(1234);
*/
// so we are using socket.io + express on same http server instance
