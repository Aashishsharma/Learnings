const moment = require('moment');

// this is a custom middleware
// next is a function which should be called at last
// next will call the next middleware used in the stack
// thus the ordering of app.use(middleware) is important
// every time client makes a requat this logger would be called
const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`);
    next();
};

module.exports = logger;