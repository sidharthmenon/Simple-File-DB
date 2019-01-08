var db = require('../index');

var users = new db.table("users");

// users.insert({name: "John Doe", age: "25", email: "john@example.com"}, function(err, item){
//   console.log(item);
// })

// users.insert({name: "Jane Doe", age: "24", email: "jane@example.com"}, function(err, item){
//   console.log(item);
// })

// users.where("name", "=", "Jane", function(err, items){
//   console.log(items);
//   items[0].data.age = 28;
//   items[0].data.email = "jane@live.com";
//   items[0].save();
// });

// users.where("name", "=", ["Jane", "John"], function(err, items){
//   console.log(items);
// })s