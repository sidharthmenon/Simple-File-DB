var db = require('../');

async function test(){
  var database = new db();

  // var user = await database.collection("users").get();
  // user.forEach(doc => {
  //   console.log(doc.data, doc.id);
  // });

  // var user = await database.collection("users").where("name", "==", "sidharth").where("age", "==", 25).get();  
  // console.log(user);
  // var user = await database.collection("users").where("name", "==", "sidharth").get();
  // console.log(user);

  // var user = await database.collection("users").add({name: "sidharth", age: 25});
  // console.log(user.id);

  // var user = await database.collection("users").doc('sidharth').set({test:"sree"}, {merge: true});
  // console.log(user);

  // var user = await database.collection("users").doc('sidharth').get();
  // console.log(user);
  
}

test();