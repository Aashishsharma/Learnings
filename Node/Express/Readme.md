## Index
1. **Express** - fast, unopinionated, web framework for Node.js, why (5) - (easy, can do server-side rendering + API, light n fast, full control to req, res, middleware), nodemon for dev
2. **Middleware** - executed after client req, and before cb func which handles req, have access to req n res, inbuilt _ 3rd party available (app.use(express.json())), custom middleware - (app.use(logger)), logger.js - (let logger=(req,res,next) => {next()})
3. **Handlebars** - templating engine (others pug, ejs), require('express-handlebars'), app.engine('handlebars',exphbs({defaultLayout:'main'})), use res.render('filename', obj-tobe-passed-to-ui), create views/layouts/main.handlebar and add {{{body}}}, and in views/filenm.hndlbr add {{obj-tobe-passed-to-ui.key}}, #each, #if
4. **Routes** -  in index.js - app.use('/api/mem', require('./routes/api/mem')), in mem.js (require express, let router = express.Router(), router.get/post/etc). then export router), if router.use(middleware), then this iddleware is specific to this api route, for query param (router.get('/') - req.query.nm), for /api/mem/123 (router.get(':id'), parseInt(req.param.id))
5. **Security** - app.use(helmet()) - (it sets security-related HTTP response headers), csrf - for cross site req. forgery (attck that forces users to execute unwanted actions) - req. csrf, let csrfProtect = csrf({cookie:true}), app.use(cookieParser()), app.use(csrfProtect)
6. **Performance** - gzip - (decrease the size of the response body), comp = require('compression'), app.use(comp()), use cluster module, set NODE_ENV to prod - (caches view templates, css/js. less verbose error msg)
7. **Error handling** - custom middleware - app.use(function (err, req, res, next) {consolelog(err), res.status(500).send('something broke')}
8. **Express init** - require('express'), app = new express(); send types - (res.send(html), res.render(filenm), res.json(), res.sendFile('path-to-static-file'))
9. **Folder structure** - root directory - (middleware, models, public, routes/api, views/client, index.js. pckg.json)

## Express
It is fast, unopniated (vary basic at it's core, gives full control on how you want to develope), **web framework for Nodejs**

#### Why?
1. Makes building web applications easier
2. Used for both server rendered webpages (html)(also know as static server) as well as API/Microservices
3. Extremley light, fast and free
4. Full control on req, res.
5. Popular
6. Provides middleware capabilities

#### Middleware functions
1. These are functions that have access to req and res objects.
2. Middleware is executed after client request is and before the callback func written for the client req.
2. Any code can be executed, express has both inbuilt and 3rd party middlewares
3. We can add any no. of middleware in a single request

#### Handlebars
1. It is a templating engine (other are pug, ejs)
2. use res.render()
3. create views/layouts/main.handlebar

## Security best practices
1. Use helmet
Helmet is just a collection of smaller middleware functions that set security-related HTTP response headers:
```javascript
var helmet = require('helmet')
app.use(helmet());

//if you don't want to use helmet then add this
app.disable('x-powered-by')
// Attackers can use this header (which is enabled by default)
// to detect apps running Express and then launch specifically-targeted attacks.
```
2. Ensure your dependencies are secure
Snyk is a tool that checks for application vulnerabilities  
```javascript
$ npm install -g snyk
$ cd your-app
$ snyk test

// to check recommendations to remove vulnerabilites
$ snyk wizard
```
3. Use csurf middleware to protect against cross-site request forgery (CSRF)
CSRF attack - Cross-Site Request Forgery (CSRF) is an attack that forces an end user to execute unwanted actions on a web application in which they’re currently authenticated. With a little help of social engineering (such as sending a link via email or chat), an attacker may trick the users of a web application into executing actions of the attacker’s choosing. If the victim is a normal user, a successful CSRF attack can force the user to perform state changing requests like transferring funds, changing their email address, and so forth. If the victim is an administrative account, CSRF can compromise the entire web application.  
```javascript
// csurf requires either cookie-parser or express-session
var csrf = require('csurf')
var csrfProtection = csrf({ cookie: true })
// parse cookies
// we need this because "cookie" is true in csrfProtection
app.use(cookieParser())
// only after setting cookieparser we should do
app.use(csrfProtection);
```

## Performance best practices
1. Use gzip compression
Gzip compressing can greatly decrease the size of the response body and hence increase the speed of a web app.
```javascript
var compression = require('compression')
var express = require('express')
var app = express()
app.use(compression())
```
2. Using Node’s cluster module
3. Set NODE_ENV to “production”
Setting NODE_ENV to “production” makes Express:
a. Cache view templates.  
b. Cache CSS files generated from CSS extensions.  
c. Generate less verbose error messages.  
Add this in env variable  
or  
Make a .env file in your app root, then require('dotenv').config() and read the values  
Tests indicate that just doing this can improve app performance by a factor of three!

## Error handling
write your own middleware
```javascript
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
});
```
You define error-handling middleware last, after other app.use() and routes calls  

Use nodemon for development
