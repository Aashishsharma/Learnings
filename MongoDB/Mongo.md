## MongoDB
It is document based NoSQL DB

## Commands
1. show dbs - shows list of all DBs (if a DB doesnot have any collection, then it is not listed)
2. use dbname - shell will be connected to dbname, if dbname does not exists, it will create new db and switch to that db
3. show collections - list all collections in the db
4. db.dropDatabase() - use this after command use dbname, deletes the db
5. db.createCollection('posts') - creates a new collection
6. db - gives name of current DB
7. exit - get out of the shell

#### 1. insert
```javascript
// 1. inser syntax - 
db.collectionName.insert(JSObject)

//e.g.
db.posts.insert({
	title: 'post title',
	body: 'post body',
	likes: 450,
	category: 'news',
	user: {
		name: 'Ashish',
		status: 'Author'
	},
	tags: ['news', 'events'],
	date: Date()
})

// 2 insermany syntax
db.collectionName.insertMany(ArrayofJSObjects)

// e.g.
db.post.insertMany([
	{
		title: 'post2 title',
		body: 'post2 body',
		likes: 45,
		category: 'news2',
		date: Date()
	},
	{
		title: 'post3 title',
		body: 'post3 body',
		likes: 415,
		category: 'news3',
		date: Date()
	}
])
```

#### 2. Read
```javascript
// syntax - 
db.collectioName.find()
db.posts.find();
db.posts.find().pretty() // pretty output
db.posts.find.sort({title: 1}) //sorts o/p by title
// for decending order use {title: -1}

// e.g. 2 using where clause
db.posts.find({category: 'news'})
// finds all dpcuments where category = news

db.posts.find({category: 'news'}).count()
db.posts.find({category: 'news'}).limit(2)
db.posts.find({category: 'news'}).sort({title: -1}).limit(2)

//forEach for custom output
db.posts.find().forEach(function(doc) {
	print('Blog Post '+ doc.title)
})

//findOne
db.posts.findOne({category: 'news'})
// returns the first doc which matched the where clause
```

#### 3. Update
```javascript
// e.g. 1
// replace entire doc
// syntax
db.collectionName.update({whereclause}, {data-to-be-updated}, {upsert: true})
// 3rd parameter is optional, is says if where clause is not matched
// then add new row, if not provided new row won't be created

db.posts.update({title: 'new post'}, 
	{
		title: 'Updated new post',
		body: 'Updaed ne body',
		date: Date()
	},
	{
		upsert: true
	}
)
// if other fields like categoory are not provided they are removed from the doc
// so in this update function we need to make sure all fields are passed, even
// if they are not required to be updated

// e.g. 2
//to eliminate above problem of not loosing fields
// we can use set operator
db.posts.update({title: 'new post'}, 
	{
		$set: {
		title: 'Updated new post',
		body: 'Updaed ne body',
		date: Date()
		}
	},
	{
		upsert: true
	}
)
// int this case, other fileds are still available, like categoory
// here set is an operator

// other operators
// 1. increment operator
db.posts.update({title: 'new post'}, {$inc: {likes: 2}})
//increase like count by 2

// 2. rename operator
db.posts.update({title: 'new post'}, {$rename: {likes: 'views'}})
// renames likes field to views
```

#### 4. delete
```javascript
db.posts.remove({title: 'new post'})

```
Note - everywhere is where clasue we have used title, but mostly **_id** attribute should be used in where clause
It is similar to primary key from relational DB  
Mongo creates a new Object attribute every time when a new doc is inserted which acts like a primary key  
it is **"_id": "ObjectId("234234cdaa4322243234")"**

#### Adding subdocuments
If post collection has a comments field, it can be a dub document (nested object) or a separate collection  
But what is preferred?
```javascript
db.posts.update({title: 'new post'},
	{
		$set: {
			comments[
			{
				user: 'Ashish',
				body: 'new comment',
				date: Date()
			},
			{
				user: 'Ashish S',
				body: 'new comment 2',
				date: Date()
			}
			]
		}
	}
)

//element match operator
// used in nested docs
db.posts.find({title: 'new post'},
	{
		comments: {
			$elemMatch: {
				user: 'Ashish'
			}
		}
	}
)
//gives all the comments from Ashish on post - new post

// less than greater than operators
db.posts.find({views: {$gt: 50}})
// find all posts where views is greater than 50
// use $gte for greater than or equal to
// similarly we have $lt and $lte 
```

#### Indexing in MongoDB
1. What is an index
