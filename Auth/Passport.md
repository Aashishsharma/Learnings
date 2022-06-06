## Index
1. **Passport JS** - auth middleware for Node req(express,passport,google.fb-strategy), 3 pieces for config (strategy, middleware, session(optional))
2. **Strategies** - diff types (uname n pwd, OAuth, OpenID), passport.use(new FB/GoogleStrategy({id, secret, cb, progileFields(name,photo,email)}, fun(accessToken, refreshToken, profile, cb){return cb(null, profile), this will caal ur cb endpoint})), then app.get('cb-url', middleware, (req,res)=> login success, redirect to home)
3. **Middleware** - to connect passwport with express, app.use(passport.initialize()), if session is used -app.use(passport.sesison())
4. **Session** - to serialize n deserialize, session would be maintained via cookie, pp.serializeUser((user, cb)=> {cb(null, user)});, pp.deserializeUser((id, done)=>{User.find(user, (err, user)=> {done(err, user);});}); seraillze user is called whenever we get response from auth servers, desearilize is called when we try to access user data availavle in req.user after login
5. **Authentication** - app.get('/abc',pp.authenticate('facebook',{ failureRedirect: '/login' }, (req, res)=>{}), protecting routes - app.get('/profile',require('connect-ensure-login').ensureLoggedIn(), (req, res)=>{})

## PassportJS
Passport is authentication middleware for Node.  
Three pieces need to be configured to use Passport for authentication:  

1. Authentication strategies
2. Application middleware
3. Sessions (optional)

#### 1. Strategies
Srategies range from verifying a username and password, delegated authentication using OAuth or federated authentication using OpenID.  
Before asking Passport to authenticate a request, the strategy (or strategies) used by an application must be configured.  
```javascript
// configuring strategy for fb
// we need to create an app in fb dev portal and 
// get client id, secret, and set callback url
passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
    // add scope option to return more user data
  },
  function(accessToken, refreshToken, profile, cb) {
    // In this example, the user's Facebook profile is supplied as the user
    // record.  In a production-quality application, the Facebook profile should
    // be associated with a user record in the application's database, which
    // allows for account linking and authentication with other identity
    // providers.
    return cb(null, profile);
  }));
//second parameter in passport.use is a callback function
//callback must call cb providing a user to complete authentication.
// If the credentials are not valid (for example, if the password is incorrect), 
//done should be invoked with false instead of a user
return cb(null, false);

// callback usrl musy also call passport.authenticate !IMP
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
```

#### 2. Middleware
In a Connect or Express-based application, passport.initialize() middleware is required to initialize Passport. If your application uses persistent login sessions, passport.session() middleware must also be used.  
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));  
app.use(passport.initialize())  
app.use(passport.session())

#### 3. Session (Serialize and deserialize)
In a typical web application, the credentials used to authenticate a user will only be transmitted during the login request. If authentication succeeds, a session will be established and maintained via a cookie set in the user's browser.  

Each subsequent request will not contain credentials, but rather the unique cookie that identifies the session. In order to support login sessions, Passport will serialize and deserialize user instances to and from the session.  
```javascript
// only the user ID is serialized to the session, 
// keeping the amount of data stored within the session small.
// When subsequent requests are received, this ID is used to find the user,
// which will be restored to req.user
passport.serializeUser(function(user, cb) {
  cb(null, user);
});
// the user id would be stored in req.user

passport.deserializeUser(function(id, done) {
  User.find(user, function(err, user) {
    done(err, user);
  });
});

// seraillze user is called whenever we get response fomr auth servers (google/fb)
// desearilize is called when we try to access user data availavle in re.user after login
// so to ge user data
app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('profile', { user: req.user });
    // note now user is avaialble in every req after authentication
  });

```

#### 4. Authenticating requests
```javascript
app.get('endpoint of your application',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
```

#### 5. Working example for google and fb
```javascript
var express = require('express');
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;
// for google var Strategy = require('passport-google-oauth20').Strategy;
passport.use(new Strategy({
    clientID: '340945577355128', // for google '1016009036096-g38b9jfrnop0mq90j0t3c9iqqj50qjl9.apps.googleusercontent.com',
    clientSecret: '2c5fdbaecb4540e6f533fbc324923977', // for google - 'Ix3TWvnRrSVLmy1P-DTB5in5'
    callbackURL: '/return',
  // for FB profileFields: ['id', 'displayName', 'photos', 'email']
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log('Profile ', profile)
    return cb(null, profile);
  }));

passport.serializeUser(function(user, cb) {
  console.log('User ', user); 
  cb(null, user);

});
passport.deserializeUser(function(obj, cb) {
  console.log('object ', obj);
  cb(null, obj);
});

var app = express();

// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/login',
  function(req, res){
    res.render('login');
  });
// api ednpoint can be anything
app.get('/login/facebook', passport.authenticate('facebook'));
// for google - app.get('/login/google', passport.authenticate('google', { scope: ['profile'] }));
app.get('/return', 
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/profile');
  });
// for google in above endpoint - facebook would be replaced by google
// and we are done
app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('profile', { user: req.user });
  });
app.listen(process.env['PORT'] || 8080);

// connect ensure login
//This middleware ensures that a user is logged in.
// If a request is received that is unauthenticated,
// the request will be redirected to a login page.
// The URL will be saved in the session, 
//so the user can be conveniently returned to the page that was originally requested.
```

## Passport local-Strategy for login/register forms

```javascript
//passport-config.js

const LocalStrategy = require('passport-local').Strategy      // use local strategy
const bcrypt = require('bcrypt')     // to encrypt passwords

function initialize(passport, getUserByEmail, getUserById) {

  // this function does actual auth - i.e, check the actual credentials provided by the user
  // in done cb we pass 2 args - 
  // 1. null (no error), 
  // 2. user/false - false (invalid creds), if valid pass user which would be stored in session and would be availbale in each request
  // 3. optional obj, with messages
  // and this authenticateUser need to be passed in pp.use(new LocalStrategy({}, authenticateUser)), see below
  const authenticateUser = async (email, password, done) => {
    // get user by email is paased in initialzie method from the callee in server.js
    const user = getUserByEmail(email)
    if (user == null) {
      return done(null, false, { message: 'No user with that email' })
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user)
      } else {
        return done(null, false, { message: 'Password incorrect' })
      }
    } catch (e) {
      return done(e)
    }
  }

  // in local strategy we pass the actual authentication function which is specific to our app
  // { usernameField: 'email' } - to indicate what the userName would be
  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))

  // serialize user to store the user info in session
  passport.serializeUser((user, done) => done(null, user.id))

  // deserialize used to remove user info from session, note - to deserialize, we just need id, since we are
  // going to remove user details
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id))
  })
}

module.exports = initialize
```

```javascript
// server.js
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// epress / passprt require
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const session = require('express-session')

const initializePassport = require('./passport-config')

// initailize passport
initializePassport(
  passport,
  // this is the getUserByEMail func used in initialize method, get this data from DB
  email => users.find(user => user.email === email),
  // this is getuserbyId to deserialize user, val should come from DB?
  id => users.find(user => user.id === id)
)

const users = []      // should be comming from DB

app.use(express.urlencoded({ extended: false }))
app.use(session({
  secret: process.env.SESSION_SECRET,  // use to encrty all the info in session for us
  resave: false,  // save if nothing changed?
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.get('/', checkAuthenticated, (req, res) => {    // checkAuthenticated - add on all routes to protect routes
  res.render('index.ejs', { name: req.user.name })
})

app.get('/login', checkNotAuthenticated, (req, res) => { //checkNotAuthenticated - show login page
  res.render('login.ejs')
})

// passport.authenticate() is where the actual login of user happens when user click on login
// the custom authenticateUser we created in passport-config.js gets called via passport.use(localstrategy) method
app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))

app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register.ejs')
})

// add new users to DB
app.post('/register', checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })
    res.redirect('/login')
  } catch {
    res.redirect('/register')
  }
})

app.post('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
})

// passport provides isAuthenticated() method by default on all requests
// using this on each route we identify if the user is logged in or not
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/login')
}

// check if not authenticated
function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}

app.listen(3000)
```
