// use this template to create express app everytime
const express = require('express');
const app = new express();
const path = require('path');
const logger = require('./middleware/logger');

//use body parser to ready request body, otherwise it will not work
// earlier body parser was separate library, now in new express it is a built-in middleware 
// to read json body 
app.use(express.json());
// to read form data
app.use(express.urlencoded({extended: false}));

//use middleware
//express.static is express's inbuilt middleware
//it make public folder as static
//if we use res.sendFile(), then we have to create route for each file
//like app.get('/home', ()=>{res.sendFIle(home.html)}), app.get('/about', ()=>{res.sendFile(about.html)})
//now we can just use static, and no routes required, just type file name in the brower with .html
//this is express static server
app.use(express.static(path.join(__dirname, 'public')));

// this is a custom middle ware that is created see logger.js
// this is application level middleware
// this is the initialization of the middleware
app.use(logger);

// using router
app.use('/api/members', require('./routes/api/member'));

app.get('/', (req, res) => {
    //res.send('<h1>hello world123</h1>'); //normal test r html can be sent via this method
    // res.render() for templeting engines like pug/ejs, we can pass variables to html using this method
    // res.json() to send json, it automatically converst objects to json
    // to send static files
    // res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started at PORT ${PORT}`));