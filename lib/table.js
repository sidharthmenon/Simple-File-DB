require('./utils');
var fs = require('fs');
var path = require('path');
var item = require('./item');

class Table{
  constructor(tablename, dbpath = ".", dbname = ".data"){

    // this._path = path.join();
    this._name = path.join(dbpath, dbname, tablename);
    console.log(this._name);
    this.items = [];
    this._childs = [];

    if (!fs.existsSync(this._name)) {
      fs.mkdirSync(this._name, { recursive: true });
    }
    
  }

  get name(){
    return this._name;
  }

  list(callback){
    fs.readdir(this._name, function(err, files){
      if(!err && files && files.length > 0){
        //console.log(files);
        var items = [];
        var tables = [];
        files.forEach(function(item){
          // console.log(path.extname(item).toLowerCase());
          if (path.extname(item).toLowerCase() == ".json"){
            items.push(item);
          }
          else{
            tables.push(item)
          }
        });
        //console.log(items, tables);
        this._list = items;
        this._childs = tables;
        typeof callback === 'function' && callback(false);
      }
      else{
        typeof callback === 'function' && callback("error reading list")
      }
    }.bind(this));
  }

  hydrate(callback){
    this.list(function(err){
      if(!err){
        var items = [];
        var count = 0;
        this._list.forEach(function(litem){
          fs.readFile(path.join(this._name, litem), 'utf8', function(err, data){
            if(!err && data){
              //console.log(data);
              items.push(new item(this._name, litem.replace(".json", ""), JSON.parse(data)));
            }
            else{
              console.log(err);
            }

            if(++count>=this._list.length){
              this.items = items;
              typeof callback === 'function' && callback(false);
            }
          }.bind(this));
        }.bind(this));
      }
    }.bind(this));
  }

  insert(data, callback){
    var tableitem = new item(this._name, null, data);
    tableitem.save(function(err){
      if(!err){
        this.items.push(tableitem);
        typeof callback === 'function' && callback(false, tableitem);
      }
      else{
        typeof callback === 'function' &&  callback(err);
      }
    }.bind(this));
  }


  // find item based on id
  find(id, callback){
    var tableitem = new item(this._name, id);
    tableitem.load(function(err){
      if(!err){
        typeof callback === 'function' && callback(false, tableitem);
      }
      else{
        typeof callback === 'function' &&  callback(err);
      }
    });
  }

  //return all items
  all(callback){
    this.hydrate(function(err){
      if(!err){
        typeof callback === 'function' &&  callback(false, this.items);
      }
      else{
        typeof callback === 'function' &&  callback(err);
      }
    }.bind(this));
  }

  // find items base on key and value
  where(key, operator, value, callback){
    this.hydrate(function(err){
      if(!err){
        
        var items = this.items.where(key, operator, value);
        
        typeof callback === 'function' && callback(false, items, this);
      }
      else{
        typeof callback === 'function' &&  callback(err);
      }
    }.bind(this));
  }

  // find items based on multiple conditions AND operation
  andWhere(conditions, callback){
    this.hydrate(function(err){
      if(!err){
        
        var items = this.items;
        conditions.forEach(item => items = items.where(item[0], item[1], item[2]));
        
        typeof callback === 'function' && callback(false, items, this);
      }
      else{
        typeof callback === 'function' &&  callback(err);
      }
    }.bind(this));
  }

  // find items based on multiple conditions OR operations
  orWhere(conditions, callback){
    this.hydrate(function(err){
      if(!err){

        var items = [];
        conditions.forEach(item => items = [...new Set([...items ,...this.items.where(item[0], item[1], item[2])])], this);

        typeof callback === 'function' && callback(false, items, this);
      }
      else{
        typeof callback === 'function' &&  callback(err);
      }
    }.bind(this));
  }

}

module.exports = Table;