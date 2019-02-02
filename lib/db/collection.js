var path = require('path')
var fs = require('fs').promises
var fsa = require('fs')
var Document = require('./document');
var uuid = require('../uid');

class Collection{
  constructor(name, db){
    this._name = path.join(db._name, name);
    this._database = db;
    console.log(this._name);
    if (!fsa.existsSync(this._name)) {
      fsa.mkdirSync(this._name, { recursive: true });
    }
    this.conditions = [];
  }
  
  doc(id){
    if(id){
      return new Document(id, this);
    }
    else{
      console.log("Invalid Document id")
    }
  }

  add(data){
    return new Promise(async function(resolve, reject){
      var newid = uuid()
      var doc = await this.doc(newid).set(data).catch(err=>{console.log(err); reject(err);});
      resolve(doc)
    }.bind(this));
  }

  _getAll(){
    return new Promise(async function(resolve, reject){
      var files = await fs.readdir(this._name).catch(err=>{console.log(err); reject(err);});
      var items = [];
      for await(var item of files){
        if (path.extname(item).toLowerCase() == ".json"){
          var doc = this.doc(item.replace(".json", ""));
          await doc.get();
          items.push({id:item.replace(".json", ""), doc: doc});
        }
      }
      resolve(items);
    }.bind(this));
  }

  where(key, condition, value){
    this.conditions.push({key: key, condition: condition, value: value});
    return this
  }

  _filter(items){
    for(var c of this.conditions){
      items = items.filter(item => item.doc.data.hasOwnProperty(c.key)?item.doc.data[c.key] == c.value:false);
    }
    return items;
  }

  get(){
    return new Promise(async function(resolve, reject){
      var items = await this._getAll();
      items = this._filter(items);     
      this.conditions = [];
      items = items.map(i => i.doc);
      resolve(items)
    }.bind(this));
  }

}

module.exports = Collection;