var path = require('path')
var fs = require('fs')
var Collection = require('./collection');

class Database {
  constructor(dbname=".data", dbpath="."){
    this._name = path.join(dbpath, dbname);
    if (!fs.existsSync(this._name)) {
      fs.mkdirSync(this._name, { recursive: true });
    }
  }
  collection(name){
    return new Collection(name, this);
  }
}

module.exports = Database
