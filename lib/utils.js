if(!Array.prototype.where){
  Array.prototype.where = function(key, operator, value){
    var items = [];
    
    if(typeof value == "string"){
      items = this.filter(item => item.data.hasOwnProperty(key)?item.data[key].includes(value):false);
    }
    else if(typeof value == "number"){
      switch(operator){
        case "=" : items = this.filter(item => item.data.hasOwnProperty(key)?item.data[key] == value:false); break;
        case ">" : items = this.filter(item => item.data.hasOwnProperty(key)?item.data[key] > value:false); break;
        case "<" : items = this.filter(item => item.data.hasOwnProperty(key)?item.data[key] < value:false); break;
      }
    }
    else if(Array.isArray(value)){
      items = this.filter(item => item.data.hasOwnProperty(key)?value.includes(item.data[key]):false);
    }
    else{
      items = this.filter(item => item.data == value);
    }    
    
    return items;
  }
}