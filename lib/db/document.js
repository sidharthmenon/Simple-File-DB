var path = require('path')
var fs = require('fs').promises

class Document{
  constructor(id, collection){
    this._collection = collection;
    this._name = path.join(collection._name, id+".json")
    this.id = id
    this.data = {}
    console.log(this._name);
  }

  set(data, options={}){
    return new Promise(async function(resolve, reject){
      var strData = ""
      var newData = {}
      if(options.merge){
        var oldData = await this.get();
        newData = {...oldData, ...data};
      }
      else{
        newData = data;
      }
      strData = JSON.stringify(newData);
      var file = await fs.open(this._name, "w").catch(err=>{console.log(err); reject(err);});      
      await fs.writeFile(file, strData).catch(err=>{console.log(err); reject(err);});
      await file.close().catch(err=>{console.log(err); reject(err);});
      this.data = newData;
      resolve(this);
    }.bind(this));
  }

  get(){
    return new Promise(async function(resolve, reject){
      var contents = await fs.readFile(this._name, 'utf8').catch(err=>{console.log(err); reject(err);});
      try{
        var data = contents?JSON.parse(contents):{};
        this.data = data;
        resolve(data);
      }
      catch(e){
        reject(e);
      }
    }.bind(this));
  }

  delete(){
    return new Promise(async function(resolve, reject){
      await fs.unlink(this._name).catch(err=>{console.log(err); reject(err);});
      resolve();
    }.bind(this));
  }

}

module.exports = Document;