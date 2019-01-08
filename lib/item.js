var fs = require('fs');
var path = require('path');
var uuid = require('./uid');

class Item {
  constructor(table, id=null, data={}){
    this._table = table;
    this.data = data;
    if(id){
      this._id = id;
      this.data.id = id;
    }
    else{
      this._id = uuid();
      this.data.id = this._id;
      console.log(this._id);
    }
  }

  load(callback){
    fs.readFile(path.join(this._table, this._id+".json"), 'utf8', function(err, data){
      if(!err && data){
        this.data = JSON.parse(data);
        typeof callback === 'function' && callback(false, this.data);
      }
      else{
        console.log(err);
        typeof callback === 'function' && callback("error reading file");
      }
    }.bind(this));
  }

  save(callback){
    fs.open(path.join(this._table, this._id+".json"), "w", function(err, file){
      if(!err && file){
        var string = JSON.stringify(this.data);
        fs.writeFile(file, string, function(err){
          if(!err){
            fs.close(file, function(err){
              if(!err){
                typeof callback === 'function' && callback(false);
              }
              else{
                typeof callback === 'function' && callback("error closing file");
              }
            });
          }
          else{
            typeof callback === 'function' && callback("error writing to file");
          }
        });
      }
      else{
        console.log(err);
        typeof callback === 'function' && callback("error: failed");
      }
    }.bind(this));
  }

  delete(callback){
    fs.unlink(path.join(this._table, this._id+".json"), function(err){
      if(!err){
        typeof callback === 'function' && callback(false);
      }
      else{
        typeof callback === 'function' && callback("error deleting file");
      }
    }.bind(this));
  }

}

module.exports = Item;