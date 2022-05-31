## Index
1. **Mongoose** - object document modeling(ODM-used to map objects with a Document Database like MongoDB) for node.js
2. **Define Schemas** - schema maps to collection (new Schema({author: String,hidden: Boolean})), types(String/Number/Date/Buffer/Boolean/ObjectId/Array/Map) 
3. **Create Model** - to use schea we need model - (mongoose.model(modelNm, schema), in collection s is added), doc=new Model(), doc.save() 
4. **Construct document** -ab = mongoose.model('ab', urSchema); small = new ab({size:'small'});small.save((err)=> {}}); or, for inserting large batches of documents - abc.insertMany([{size:'small'}], (err)=> {}); 
5. **Connect to DB** - try block - await mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser:true});
6. **CRUD operations** - (1. Read -Person=mongoose.model('Person', urSchema);Person.findOne({'name':'ab',age:{$gte:18 }}, 'nm age', (err, per)=>{log(per.nm)}, Person.find({}), 2. create- let p = new Person({nm:'foo',age:21}); p.save(), 3. update - Model.update/updateMany(query({age:{$gt 18}}),{$set:{nm: 'jason'}}, options(upsert),(err, es)=>{}); 4. delete - person.deleteOne/Many({name: 'Eddard' },(err)=>{});)
7. **Validation** - is a middleware defined in schematype, to run manually-doc.validate(cb), new Schema({nm:{type:String,required: true}}), others-(min,max), custom validators(add validate:{func(param){based on param return T/F}, {message:err-msg})
8. **Middleware** - pre/post hooks, called at schema level, schema.pre('save',(next)=>{// do stuff next();}, others -(.post('validate/remove/save'))); usecase - complex validation, foreign key constraints - (removing a user removes all his blogposts), again FK constraints is at app level rather than at schema level

## Mongoose
It is mongodb object document modeling (ODM) for node.js  
Object Document Mapper (ODM) is used to map objects with a Document Database like MongoDB  


### Connecting to a DB
```javascript
mongoose.connect('mongodb://localhost:27017/test', () => {
  console.log('Connected to MDB')
}, (error) => {
  console.log('Error connecting to MDB')
});


// To handle errors after initial connection was established
mongoose.connection.on('error', err => {
  logError(err);
});
```
Mongoose lets you start using your models immediately, without waiting for mongoose to establish a connection to MongoDB.  
That's because mongoose buffers model function calls internally.

### Schemas
##### 1. Define a schema
Everything in Mongoose starts with a Schema. Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
```javascript
 import mongoose from 'mongoose';
  const { Schema } = mongoose;
  const blogSchema = new Schema({
    title:  String, // String is shorthand for {type: String}
    author: String,
    body:   String,
    comments: [{ body: String, date: Date }],
    hidden: Boolean,
    meta: {
      votes: Number,
      favs:  Number
    },
    address: addressSchema // this can be a new schema - new Schema({street: String, houseNo: String})
  });
```
schema types -  
1. String
2. Number
3. Date
4. Buffer
5. Boolean
6. Mixed - An "anything goes" SchemaType
7. ObjectId
8. Array
9. Decimal128
10. Map

##### 2. Create a model
To use our schema definition, we need to convert our blogSchema into a Model we can work with. 
```javascript
//syntax
mongoose.model(collectionNameInDB, schema)

const Blog = mongoose.model('Blog', blogSchema);
// ready to go!
// the returned value 'Blog' can be used to perform operations
```
Mongoose automatically looks for the plural, lowercased version of your model name. Thus, for the example above, the model Blog is for the Blogs collection in the database.  

By default, Mongoose adds an **_id** (of type ObjectId) property to your schemas.  
Instance of Models is documents
```javascript
const doc = new Blog();
await doc.save();
```

##### 3. Construct Documents
```javascript
const Tank = mongoose.model('Tank', yourSchema);
const small = new Tank({ size: 'small' });
small.save(function (err) {
  if (err) return handleError(err);
  // saved!
});
// or, for inserting large batches of documents
Tank.insertMany([{ size: 'small' }], function(err) {
});
```

##### 5. CRUD operations
Mongoose models provide several static helper functions for CRUD operations.  
**Note - findOne() and find() methods in mongoose work exactly same that in mongoDB shell commands.**  
So if we know mongoDB, mongoose query commands would be same
```javascript
// 1. read
const Person = mongoose.model('Person', yourSchema);

// find each person with a last name matching 'Ghost', selecting the `name` and `occupation` fields
Person.findOne({ 'name.last': 'Ghost' }, 'name occupation', function (err, person) {
  if (err) return handleError(err);
  // Prints "Space Ghost is a talk show host".
  console.log('%s %s is a %s.', person.name.first, person.name.last,
    person.occupation);
});

// find all documents
await MyModel.find({});

// find all documents named john and at least 18 - same as mongoDB schema
MyModel.find({ name: 'john', age: { $gte: 18 }}, function (err, docs) {});

// there is another way we can use monggose
const user = MyModel.where("name").eq("john").where("age").gt(18) // same o/p as above

// 2. create
const schema = new Schema({ name: String, age: { type: Number, min: 0 } });
const Person = mongoose.model('Person', schema);
let p = new Person({ name: 'foo', age: 'bar' });
await p.save();
// 3. update
// Updates one document in the database without returning it.
Model.update(query, { $set: { name: 'jason bourne' }}, options, function(err, res));

// update one
// Same as update(), except it does not support the multi or overwrite options.
const res = await Person.updateOne({ name: 'Jean-Luc Picard' }, { ship: 'USS Enterprise' });
res.n; // Number of documents matched
res.nModified; // Number of documents modified

// update many
// Same as update(), except MongoDB will update all documents that match filter
const res = await Person.updateMany({ name: /Stark$/ }, { isDeleted: true });
res.n; // Number of documents matched
res.nModified; // Number of documents modified

// Try to not use Update methods since they skip schema validation
// See Validation Skip section, instea do this
let user = await MyModel.find({ name: 'john'});
user.name = 'kyle'
user.save();
// this will run the validation
// but sometimes it's convenient to use updateMany(), since we are doing a bulk update

// 4 Delete
Character.deleteOne({ name: 'Eddard Stark' }, function (err) {});
Character.deleteMany({ name: /Stark/, age: { $gte: 18 } }, function (err) {});
```

##### 6. Validation
1. Validation is defined in the SchemaType
2. Validation is middleware. Mongoose registers validation as a pre('save') hook on every schema by default.
3. You can manually run validation using doc.validate(callback)
```javascript
const schema = new Schema({
  name: {
    type: String,
    required: true
  }
});
const Cat = db.model('Cat', schema);

// This cat has no name :(
const cat = new Cat();
cat.save(function(error) {
	console.log('cat name is required ', error)l
}
```
```javascript
// built in validators
const breakfastSchema = new Schema({
  eggs: {
    type: Number,
    min: [6, 'Too few eggs'],
    max: 12
  },
  bacon: {
    type: Number,
    required: [true, 'Why no bacon?']
  },
  drink: {
    type: String,
    enum: ['Coffee', 'Tea'],
    required: function() {
      return this.bacon > 3;
    }
  },
   date: { type: Date, default: () => Date.now()), immutable: true }
    // default needs to be a value, but if we don't wrap this data in a function, every time the 1st time value of Date.now() would be passed
    // immutable = true means that value cannot be changed gain, usually used in createdAt field
   
});
const Breakfast = db.model('Breakfast', breakfastSchema);
const badBreakfast = new Breakfast({
  eggs: 2,
  bacon: null,
  drink: 'Milk'
});
badBreakfast.save() // error thrown for each filed
```
```javascript
// custom validators
// Custom validation is declared by passing a validation function
const userSchema = new Schema({
  phone: {
    type: String,
    validate: {
      validator: function(v) {
        return /\d{3}-\d{3}-\d{4}/.test(v); // regex for valid phone no
        // v argument is a phone number value that is set for a particluar doc
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'User phone number required']
  }
});

```

### Validation Skip
**NOTE - All those validations work when we use the .save() method while adding new record/document. Id doesn't work when we do updateOne/Many. So the best way is to first find the object uwing find queries, then update that obj, and then call the save method, so that the validation is run**

##### 7. Middlewares
Middleware (also called pre and post hooks) are functions which are passed control during execution of asynchronous functions.  
```javascript
// hooks are called at schema level
// 1. pre middleware
const schema = new Schema(..);
schema.pre('save', function(next) {
  // do stuff
  // note we cannot use arrow functions because we are using this
  // this refereces to the model instance thta we are about to save
  // add updatedAt val, so we don't have to do this on every doc save
  this.updatedAt = Date.now()
  // call next middleware if exists
  next();
});
// this function would be called for every document that is being saved
// verify above statement

// 2. post hooks
// in post hooks we get doc as first arg in cb func
// this doc consists the dox we have saved/ validated
// hence in pre hooks we use this, and in post hooks we use doc
schema.post('validate', function(doc, next) {
  console.log('%s has been validated (but not saved yet)', doc._id);
});
schema.post('save', function(doc, next) {
  console.log('%s has been saved', doc._id);
});
schema.post('remove', function(doc, next) {
  console.log('%s has been removed', doc._id);
});
```
When to use?  
1. complex validation
2. removing dependent documents (removing a user removes all his blogposts), using this foreign key constraint can be applied, same as RDBMS,but again the difference is it would be at application level and RDBMS have this constraints at DB level (implicit)