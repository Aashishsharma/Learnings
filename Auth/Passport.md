## PassportJS
Passport is authentication middleware for Node.  
Three pieces need to be configured to use Passport for authentication:  

1. Authentication strategies
2. Application middleware
3. Sessions (optional)

#### 1. Strategies
trategies range from verifying a username and password, delegated authentication using OAuth or federated authentication using OpenID.  
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