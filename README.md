# Simple-File-DB
Simple file based data store in nodejs. Data is stored as json files.

|SQL|FileDB|
|---|---|
|Table|Folder|
|Row|File|

# How to use
> currently not available in npm you have to clone manually.

### 1. require the package
```javascript
var db = require("./db") //change accordingly
```

### 2. define variable to represent table
```javascript
var users = new db.table("users");
```

> here a table `users` is linked to variable `users`. if table is not existing it will be created.

> default location of database current directory (`./`)

> default name of database is `.data`

> to define custom location and name for database use
```javascript
var users = db.table(tablename, databasepath, databasename);
```

### 3. insert data into table
```javascript
users.insert({name: "John Doe", age: "25", email: "john@example.com"}, function(err, item){
  console.log(item);
})

users.insert({name: "Jane Doe", age: "24", email: "jane@example.com"}, function(err, item){
  console.log(item);
})
```

### 4. retrive data and update
```javascript
users.where("name", "=", "Jane", function(err, items){
  console.log(items);
  items[0].data.age = 28;
  items[0].data.email = "jane@live.com";
  items[0].save();
});
```

# ::TODO:: (Help wanted)
currently this uses a callback system to get data. this has to be changed so as to enable chaining of methods something like this:
```javascript
//the above update method mentioned in point 4.(retrive data and update) will be changed to something like this
users.where("name", "=", "Jane")[0].update({age:28, email: "jane@live.com"}).save();
```
