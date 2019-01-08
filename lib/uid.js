/*  
* Generate Unique id
*/
var os = require('os');

var uid = {};

uid.pid = process && process.pid ? process.pid.toString(36) : "";

uid.address = function(rotate=false){
  var nis = os.networkInterfaces(); // get available network interfaces
  var mac = "";
  var address = "";
  var cycle = Math.floor(Math.random() * Object.keys(nis).length ) + 1; //random number to cycle multiple times when more than one nic is available

  for(key in nis){
    const ni = nis[key];
    const len = ni.length;
    for(var i =0; i<len; i++){
      if(ni[i].mac && ni[i].mac != '00:00:00:00:00:00'){
        mac = ni[i].mac;
        break;
      }
    }
    if(mac){
      address = parseInt(mac.replace(/\:|\D+/gi, '')).toString(36).padStart(6,address?address:"zxqrta");
      if(!rotate){
        return address;
      }

      if(--cycle<=0){
        return address;
      }
    }
  }
  return address?address:false;
}

uid.now = function(){
  var time = Date.now();
  var last = uid.now.last || time;
  return (uid.now.last = time > last ? time : last + 1).toString(36);
}

uid.generate = function(prefix, rotate = false){
  return (prefix || '') + uid.pid + uid.address(rotate) + uid.now();
}

module.exports = module.exports.default = uid.generate;
